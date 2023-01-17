import axios from "axios";
import { url } from "../appConstants";

export const getCategory = async (userDetails) => {
  try {
    console.log("api.... ", userDetails)
    let response = await axios.get(`${url}/products/categories`,
    {headers: 
      {"Authorization": `Bearer ${userDetails.accessToken}`},
      Accept: "application/json"
    }
    );
    console.log("respo.... ", response)
    return response;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const getAllProducts = async (userDetails) => {
  try {
    console.log("det... ", userDetails)
    let response = await axios.get(`${url}/products`,
    {headers: 
      {"Authorization": `Bearer ${userDetails.accessToken}`},
      Accept: "application/json"
    }
    );
    return {
      isSuccess: true,
      response,
    };
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const getAllProductsCategory = async (categoryDetails) => {
  try {
    console.log("how category looks here... ", categoryDetails);
    let response = await axios.get(`${url}/products/category/${categoryDetails.category}`,
    {
      headers:
      {"Authorization": `Bearer ${categoryDetails.userDetails.accessToken}`},
      Accept: "application/json"
    }
    );
    return {
      isSuccess: true,
      response,
    };
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const getProductById = async (userDetails) => {
  try {
    let response = await axios.get(`${url}/product/${userDetails.id}`,
    {
      headers:
      {"Authorization": `Bearer ${userDetails.accessToken}`},
      Accept: "application/json"
    }
    );
    return {
      isSuccess: true,
      response,
    };
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const userSignup = async (signupDetails) => {
  try {
    let response = await axios.post(`${url}/user/signup`, signupDetails);
    console.log("signup res... ", response);
    return {
      isSuccess: true,
      response,
    };
  } catch (error) {
    console.log("signu error", error);
    return error;
  }
};

export const userLogin = async (loginDetails) => {
  try {
    let response = await axios.post(`${url}/user/login`, loginDetails);
    return {
      isSuccess: true,
      response,
    };
  } catch (error) {}
};

export const searchProducts = async (searchDetails) => {
  try {
    console.log("searchdetaisl... ", searchDetails)
    console.log("url is... ", `${url}/search`)
    let response = await axios.post(`${url}/search`, 
    {headers:
      {"Authorization": `Bearer ${searchDetails.accessToken}`},
      Accept: "application/json",
      search: searchDetails.searchField
    }
    );
    console.log("res for saeach.... ", response)
    return {
      isSuccess: true,
      response,
    };
  } catch (error) {
    return error;
  }
};

export const addProduct = async (productDetails) => {
  try {
    console.log("product details... ", productDetails)
    let productResponse = await axios.post(`${url}/product`, 
    {productDetails: productDetails},
    {headers:
      {"Authorization": `Bearer ${productDetails.userDetails.accessToken}`},
      Accept: "application/json",
    }
    );
    return productResponse;
  } catch (error) {
    return error;
  }
};

export const editOrUpdateProduct = async (editDetails) => {
  try {
    let productResponse = await axios.put(
      `${url}/product/${editDetails.id}`,
      {productDetails: editDetails.product},
      {headers:
        {"Authorization": `Bearer ${editDetails.accessToken}`},
        Accept: "application/json",
      }
    );
    return productResponse;
  } catch (error) {
    return error;
  }
};

export const deleteProductByid = async (userDetails) => {
  try {
    let deleteResponse = await axios.delete(`${url}/product/${userDetails.id}`,
    {headers:

      {"Authorization": `Bearer ${userDetails.accessToken}`},
      Accept: "application/json"

    }
    );
    return deleteResponse;
  } catch (error) {
    return error;
  }
};

export const getCartItems = async (userDetails) => {
  try {
    let cartResponse = await axios.get(`${url}/cart/${userDetails.userId}`,
    {headers:

      {"Authorization": `Bearer ${userDetails.accessToken}`},
      Accept: "application/json"

    }
    );
    return cartResponse;
  } catch (error) {
    return error;
  }
};

export const makePayment = async (paymentDetails) => {
  try {
    let paymentResponse = await axios.post(
      `${url}/order/checkout`,
      {amount:paymentDetails.amount},
      {headers:
        {"Authorization": `Bearer ${paymentDetails.accessToken}`},
        Accept: "application/json",
        // amount: paymentDetails.amount
      }
    );
    return paymentResponse;
  } catch (error) {
    return error;
  }
};

export const verifyPayment = async (data) => {
  try {
    console.log("how does data look... ", data)
    let verificationResponse = await axios.post(`${url}/verify`, 
    {data},
    {headers:
      {"Authorization": `Bearer ${data.accessToken}`},
      Accept: "application/json",
    }
    // data
    );
    return verificationResponse;
  } catch (error) {
    return error;
  }
};
