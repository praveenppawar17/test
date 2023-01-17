import { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { deleteProductByid, getAllProducts } from "../service/api";
import Product from "./Product";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    console.log("user sessionStorage ..... ", sessionStorage)
    const userDetails = {accessToken:sessionStorage.getItem("accessToken")}
    console.log("user..... ", userDetails)
    let response = await getAllProducts(userDetails);
    if (response.isSuccess) {
      setProducts(response.response.data.productResponse);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const deleteProduct = async (id) => {
    const userDetails = {
      id,
      accessToken:sessionStorage.getItem("accessToken")
    }
    const deleteResponse = await deleteProductByid(userDetails);
    console.log("delt res,..... ", deleteResponse)
    alert(deleteResponse.data.msg);
    fetchData();
  };
  return (
    <>
      <Grid container>
        {products.map((product) => (
          <Grid item lg={3} sm={4} xs={12} key={product._id}>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/product/${product._id}`}
            >
              <Product product={product} />
            </Link>
            <Button color="error" onClick={() => deleteProduct(product._id)}>
              Delete
            </Button>
            <Link
              to={`/updateproduct/${product._id}`}
              style={{ textDecoration: "none" }}
            >
              Edit
            </Link>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ManageProduct;
