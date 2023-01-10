import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import Cart from "./components/Cart";
import ProductDetails from "./components/ProductDetails";
import Header from "./components/Header";
import { Box } from "@mui/material";
import Login from "./components/Login";
import { useState } from "react";
import ManageProduct from "./components/ManageProduct";
import AddProduct from "./components/AddProduct";
import UpdateProduct from "./components/UpdateProduct";


const PrivateRoute = ({isAuthenticated, ...props}) => {
  return isAuthenticated ? 
  <>
    <Header />
    <Outlet />
  </>
  : <Navigate replace to="/login"/>
}

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);
  return (
    <>
      <BrowserRouter>
        <Box style={{ marginTop: 64 }}>
          <Routes>
            <Route path="/login" element={<Login isUserAuthenticated={isUserAuthenticated}/>}/>

            <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
            <Route path="/" element={<Home />} />
            </Route>
            
            <Route path="/cart" element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
            <Route path="/cart" element={<Cart />} />
            </Route>
            
            <Route path="/product/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
            <Route path="/product/:id" element={<ProductDetails />} />
            </Route>

            <Route path="/manageproduct" element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
            <Route path="/manageproduct" element={<ManageProduct />} />
            </Route>

            <Route path="/addproduct" element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
            <Route path="/addproduct" element={<AddProduct />} />
            </Route>

            <Route path="/updateproduct/:id" element={<PrivateRoute isAuthenticated={isAuthenticated}/>}>
            <Route path="/updateproduct/:id" element={<UpdateProduct />} />
            </Route>
          </Routes>
        </Box>
      </BrowserRouter>
    </>
  );
}

export default App;
