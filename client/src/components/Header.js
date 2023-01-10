import { AppBar, Badge, styled, Toolbar } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import React, { useState } from "react";
import Search from "./Search";
import { Link } from "react-router-dom";
import { logo } from "../appConstants";

import { useSelector } from "react-redux";

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
                badgeContent={
                  cartDetails.cartItems?.length
                    ? cartDetails.cartItems[cartDetails.cartItems.length-1].quantity
                    : ""
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
