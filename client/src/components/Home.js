import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getCategory } from "../service/api";
import Categories from "./Categories";
import Products from "./Products";
import SearchList from "./searchList";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const toggle = useSelector(state => state.cart.toggle)
  const searchData = useSelector(state => state.cart.products)
  useEffect(() => {
    const getCategoryList = async () => {
      const categoryResponse = await getCategory();
      setCategories([...categories,...categoryResponse.data.categoryResponse]);
    };
    getCategoryList();
  }, []);
  
  return (
    <div>
      <Grid container >
        <Grid item lg={2} xs={12} sm={2}>
          <Categories categories={categories} />
        </Grid>
        <Grid container item xs={12} sm={10} lg={10}>
          {
            toggle ?    
            <div style={{width: "50%", margin: "0 auto"}}>
            <SearchList filteredProducts={searchData}/> 
            </div>
            : <Products />
          }
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
