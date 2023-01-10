import { AccountCircle } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import React from "react";

const Profile = () => {
  return (
    <>
      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
      >
        <AccountCircle style={{ color: "#000" }} />
      </IconButton>
    </>
  );
};

export default Profile;
