import { Box, Typography, Grid, styled } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { getCartItems } from "../service/api";
import CartItem from "./CartItem";

const Component = styled(Grid)(({ theme }) => ({
  padding: "30px 135px",
  display: "flex",
  marginTop: "15px",
  [theme.breakpoints.down("sm")]: {
    padding: "15px 0",
  },
}));

const LeftComponent = styled(Grid)(({ theme }) => ({
  paddingRight: 15,
  [theme.breakpoints.down("sm")]: {
    marginBottom: 15,
  },
}));

const Header = styled(Box)`
  padding: 15px 24px;
  background: #fff;
`;


const Cart = () => {
  const [cartItems, setCartItems] = useState([])
  // const cartItems = useSelector((state) => state.cart.cartItems);
  useEffect(()=>{
    const getUserCartItems = async () => {
    const cartResponse = await getCartItems(sessionStorage.getItem("userId"))
    console.log("carrit,es.... ", cartResponse)
    setCartItems([...cartItems, ...cartResponse.data.cartResponse.products])
    
    }
    getUserCartItems()
  },[])
  console.log("cartims cosl... ", cartItems.length?.cartItems )
  return (
    <>
      {cartItems.length ? (
        <Component container>
          <LeftComponent item lg={9} md={9} sm={12} xs={12}>
            <Header>
              <Typography style={{ fontWeight: 600, fontSize: 18 }}>
                My Cart ({cartItems?.length})
              </Typography>
            </Header>
            {cartItems.map((item) => (
              <CartItem item={item} />
            ))}
          </LeftComponent>
          <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
        </Component>
      ) : (
        "Cart is empty"
      )}
    </>
  );
};

export default Cart;
