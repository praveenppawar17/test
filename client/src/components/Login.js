import React from "react";
import { Box, Button, styled, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { userLogin, userSignup } from "../service/api";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
`;

const Image = styled("img")({
  width: 100,
  margin: "auto",
  display: "flex",
  padding: "50px 0 0",
});

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;
const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  flex-direction: column;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0/ 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 14px;
`;

const signupInitialValues = {
  name: "",
  email: "",
  password: "",
};

const loginInitialValues = {
  email: "",
  password: "",
};

const Login = ({ isUserAuthenticated }) => {
  const imageURL =
    "https://img.freepik.com/free-photo/showing-cart-trolley-shopping-online-sign-graphic_53876-133967.jpg?w=2000";

  const [account, toggleAccount] = useState("login");
  const [signup, setSignup] = useState(signupInitialValues);
  const [error, setError] = useState("");
  const [login, setLogin] = useState(loginInitialValues);
  const navigate = useNavigate();

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };
  const signupUser = async () => {
    console.log(";sinup Object....", signup);
    let response = await userSignup(signup);
    console.log("wil i get hrer..... ", response);
    if (response.isSuccess) {
      setError("");
      setSignup(signupInitialValues);
      toggleAccount("login");
    } else {
      setError("Something went wrong please try again later");
    }
  };

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    console.log("login details...", login);
    let response = await userLogin(login);
    console.log("respo for login....... ", response);
    if (response.isSuccess) {
      setError("");
      sessionStorage.setItem(
        "accessToken",
        `Bearer ${response.response.data.accessToken}`
      );
      sessionStorage.setItem(
        "RefreshToken",
        `Bearer ${response.response.data.refreshToken}`
      );
      sessionStorage.setItem("name", response.response.data.name);
      sessionStorage.setItem("userId", response.response.data.userId);
      // setAccount({ username: response.data.username, name: response.data.name});
      isUserAuthenticated(true);
      navigate("/");
    } else {
      setError("Something went wrong please try again later");
    }
  };
  return (
    <Component>
      <Image src={imageURL} alt="login" />
      {account === "login" ? (
        <Wrapper>
          <TextField
            variant="standard"
            value={login.email}
            label="Enter email"
            name="email"
            onChange={(e) => onValueChange(e)}
          />
          <TextField
            variant="standard"
            value={login.password}
            label="Enter password"
            name="password"
            onChange={(e) => onValueChange(e)}
          />
          {error && <Error>{error}</Error>}

          <LoginButton variant="contained" onClick={() => loginUser()}>
            Login
          </LoginButton>
          <Text style={{ textAlign: "center" }}>OR</Text>
          <SignupButton onClick={() => toggleSignup()}>
            Create an account
          </SignupButton>
        </Wrapper>
      ) : (
        <Wrapper>
          <TextField
            variant="standard"
            onChange={(e) => onInputChange(e)}
            name="name"
            label="Enter name"
          />
          <TextField
            variant="standard"
            onChange={(e) => onInputChange(e)}
            name="email"
            label="Enter email"
          />
          <TextField
            variant="standard"
            onChange={(e) => onInputChange(e)}
            name="password"
            label="Enter password"
          />

          {error && <Error>{error}</Error>}
          <SignupButton onClick={signupUser}>Signup</SignupButton>
          <Text style={{ textAlign: "center" }}>OR</Text>
          <LoginButton variant="contained" onClick={() => toggleSignup()}>
            Already have an account
          </LoginButton>
        </Wrapper>
      )}
    </Component>
  );
};

export default Login;
