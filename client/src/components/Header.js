import { AppBar, Badge, styled, Toolbar } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import Search from "./Search";
import { Link } from "react-router-dom";
import { logo } from "../appConstants";

import { useDispatch, useSelector } from "react-redux";
import { getCartItems } from "../service/api";
import { getCart } from "../redux/action";

const StyledAppBar = styled(AppBar)`
  background-color: #edf0f3;
  height: 60px;
`;
const Image = styled("img")({
  width: 50,
  borderRadius: "50%",
});

const Header = () => {
  const [toggle, setToggle] = useState("header");
  const cartDetails = useSelector((state) => state.cart);
  const [cartItems, setCartItems] = useState([])
  const dispatch = useDispatch()
  console.log("catrd details in header.... ", cartDetails.cartItems.length)
  // console.log("catrd details in header.... ", Object.keys(cartDetails.cartItems[0]).length)
  
  
  useEffect(()=>{
    // const getUserCartItems = async () => {
    //   const userDetails = {
    //     accessToken:sessionStorage.getItem("accessToken"),
    //     userId: sessionStorage.getItem("userId")
    //   } 
    // const cartResponse = await getCartItems(userDetails)
    // console.log("cart items.... ", cartResponse)
    // setCartItems([...cartResponse.data.cartResponse.products])
    // console.log("will i get cart items length.... ", cartItems)
    // setUpdateCartItem(cartItems.length)
    // console.log("length......... ", updateCartItem)
    // }
    // getUserCartItems()
    const userDetails = {
      accessToken:sessionStorage.getItem("accessToken"),
      userId: sessionStorage.getItem("userId")
    } 
    dispatch(getCart(userDetails))
  },[])

  const toggleHeader = () => {
    toggle === "header" ? setToggle("manageProduct") : setToggle("header");
  };
  return (
    <>
      {toggle === "header" ? (
        <StyledAppBar position="fixed">
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: 80,
              marginRight: 80,
              width: "90%",
            }}
          >
            <Link to="/">
              <Image src={logo} alt="speridianlogo" />
            </Link>
            <Search />

            <Link to="/cart">
              <Badge
                // badgeContent={
                //   cartItems?.length
                //     ? cartItems.length
                //     : ""
                // }
                badgeContent={
                  cartDetails.cartItems.length === 0 ? "": (cartDetails.cartItems ? Object.keys(cartDetails.cartItems[0]).length : cartDetails.cartItems.length )
                  //  cartDetails.cartItems?.length ? Object.keys(cartDetails.cartItems[0]).length : ""

                }
                color="secondary"
              >
                <ShoppingCart style={{ color: "#000" }} />
              </Badge>
            </Link>
            {/* <Profile /> */}
            <Link to="/manageproduct" onClick={toggleHeader}>
              Manage Product
            </Link>
            <Link to="/login">Logout</Link>
          </Toolbar>
        </StyledAppBar>
      ) : (
        <StyledAppBar>
          <Toolbar
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: 80,
              marginRight: 80,
              width: "90%",
            }}
          >
            <Link to="/">
              <Image src={logo} alt="speridianlogo" onClick={toggleHeader} />
            </Link>

            <Link to="/addproduct">Add Product</Link>

            <Link to="/login">Logout</Link>
          </Toolbar>
        </StyledAppBar>
      )}
    </>
  );
};

export default Header;
