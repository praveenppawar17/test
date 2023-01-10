import { useEffect, useState } from "react";
import { Grid, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { deleteProductByid, getAllProducts } from "../service/api";
import Product from "./Product";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const fetchData = async () => {
    let response = await getAllProducts();
    if (response.isSuccess) {
      setProducts(response.response.data.productResponse);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const deleteProduct = async (id) => {
    const deleteResponse = await deleteProductByid(id);
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
