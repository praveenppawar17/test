import React from "react";
import { useState, useEffect } from "react";
import { Box, Typography, styled, Grid, Button } from "@mui/material";
import { getProductById } from "../service/api";
import { addToCart, getCart } from "../redux/action";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Component = styled(Box)`
  background: #f2f2f2;
  margin: 60px;
`;

const Container = styled(Grid)(({ theme }) => ({
  background: "#FFFFFF",
  display: "flex",
  margin: "0 auto",
  [theme.breakpoints.down("md")]: {
    margin: 0,
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "80vh",
  objectFit: "cover",
});

const Heading = styled(Typography)`
  font-size: 38px;
  font-weight: 600;
  text-align: center;
  margin: 50px 0 10px 0;
`;

const RightContainer = styled(Grid)`
  margin-top: 50px;
  & > p {
    margin-top: 10px;
  }
`;
const ProductDetails = () => {
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const userDetails = {
        accessToken:sessionStorage.getItem("accessToken"),
        id
      }
      let response = await getProductById(userDetails);
      if (response.isSuccess) {
        setProduct(response.response.data.productResponse);
      }
    };
    fetchData();
  }, []);

  const addProductToCart = (productId) => {
    setQuantity(quantity + 1);
    const productDetails = {
      productId, quantity, price:product.price,accessToken:sessionStorage.getItem("accessToken"),
    }
    dispatch(addToCart(productDetails));
    const userDetails= {
      userId: sessionStorage.getItem("userId"),
      accessToken: sessionStorage.getItem("accessToken")
    }
    // dispatch(getCart(userDetails))
  };
  return (
    <Component>
      <Container container>
        <Grid item lg={4} md={4} sm={8} xs={12}>
          <Image src={product.image} alt="product" />
        </Grid>
        <RightContainer item lg={8} md={8} sm={8} xs={12}>
          <Heading>{product.title}</Heading>
          <Typography>{product.category}</Typography>
          <Typography>Price: ₹ {product.price} only</Typography>
          <Button
            onClick={() => addProductToCart(product._id)}
            variant="contained"
          >
            Add to cart
          </Button>
        </RightContainer>
      </Container>
    </Component>
  );
};

export default ProductDetails;
