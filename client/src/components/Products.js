import { useEffect, useState } from "react";
import { Grid, Box } from "@mui/material";
import { Link, useSearchParams } from "react-router-dom";
import { getAllProducts, getAllProductsCategory } from "../service/api";
import Product from "./Product";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  useEffect(() => {
    const fetchData = async () => {
      let response =
        category === null
          ? await getAllProducts()
          : await getAllProductsCategory(category);
      if (response.isSuccess) {
        setProducts(response.response.data.productResponse);
      }
    };
    fetchData();
  }, [category]);

  return (
    <>
      {products?.length ? (
        products.map((product) => (
          <Grid item lg={3} sm={4} xs={12} key={product._id}>
            <Link
              style={{ textDecoration: "none", color: "inherit" }}
              to={`/product/${product._id}`}
            >
              <Product product={product} />
            </Link>
          </Grid>
        ))
      ) : (
        <Box style={{ color: "878787", margin: "30px 80px", fontSize: 18 }}>
          No data is available for selected category or reload the page
        </Box>
      )}
    </>
  );
};

export default Products;
