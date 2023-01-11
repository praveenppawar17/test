import axios from "axios";
import { url } from "../appConstants";

export const getCategory = async () => {
  try {
    let response = await axios.get(`${url}/products/categories`);
    return response;
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const getAllProducts = async () => {
  try {
    let response = await axios.get(`${url}/products`);
    return {
      isSuccess: true,
      response,
    };
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const getAllProductsCategory = async (category) => {
  try {
    console.log("how category looks here... ", category);
    let response = await axios.get(`${url}/products/category/${category}`);
    return {
      isSuccess: true,
      response,
    };
  } catch (error) {
    console.log("error", error);
    return error;
  }
};

export const getProductById = async (id) => {
  try {
    let response = await axios.get(`${url}/product/${id}`);
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

export const searchProducts = async (search) => {
  try {
    let response = await axios.post(`${url}/search`, { search });
    return {
      isSuccess: true,
      response,
    };
  } catch (error) {
    return error;
  }
};

export const addProduct = async (productDeatils) => {
  try {
    let productResponse = await axios.post(`${url}/product`, productDeatils);
    return productResponse;
  } catch (error) {
    return error;
  }
};

export const editOrUpdateProduct = async (editDetails) => {
  try {
    let productResponse = await axios.put(
      `${url}/product/${editDetails.id}`,
      editDetails.product
    );
    return productResponse;
  } catch (error) {
    return error;
  }
};

export const deleteProductByid = async (id) => {
  try {
    let deleteResponse = await axios.delete(`${url}/product/${id}`);
    return deleteResponse;
  } catch (error) {
    return error;
  }
};

export const getCartItems = async (userId) => {
  try {
    let cartResponse = await axios.get(`${url}/cart/${userId}`);
    return cartResponse;
  } catch (error) {
    return error;
  }
};

export const makePayment = async (paymentDetails) => {
  try {
    let paymentResponse = await axios.post(
      `${url}/order/checkout`,
      paymentDetails
    );
    return paymentResponse;
  } catch (error) {
    return error;
  }
};

export const verifyPayment = async (data) => {
  try {
    let verificationResponse = await axios.post(`${url}/verify`, data);
    return verificationResponse;
  } catch (error) {
    return error;
  }
};
