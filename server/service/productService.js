import axios from "axios";
import {
  addProductDao,
  addProductsFromFakeStoreDao,
  deleteProductByIdDao,
  getAllProductsDao,
  getCategoryDao,
  getProductByIdDao,
  getProductsbyCategoryDao,
  searchProductDao,
  updateProductDao,
} from "../dao/productDao.js";

export const addProductsFromFakeStoreService = async (request, response) => {
  try {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    const filteredData = data.map((item) => {
      return {
        title: item.title,
        price: item.price,
        description: item.description,
        rating: item.rating.rate,
        count: item.rating.count,
        category: item.category,
        image: item.image,
        category: item.category,
      };
    });

    const productResponse = await addProductsFromFakeStoreDao(filteredData);
    return productResponse;
  } catch (error) {
    return error;
  }
};

export const updateProductService = async (updateDetails) => {
  try {
    console.log("in service.... ", updateDetails);

    const productResponse = await updateProductDao(updateDetails);
    return productResponse;
  } catch (error) {
    return error;
  }
};

export const deleteProductByIdService = async (id) => {
  try {
    const productResponse = await deleteProductByIdDao(id);
    return productResponse;
  } catch (error) {
    return error;
  }
};

export const searchProductService = async (search) => {
  try {
    const productResponse = await searchProductDao(search);
    if (!productResponse) {
      return false;
    }
    return productResponse;
  } catch (error) {
    return error;
  }
};

export const getProductByIdService = async (id) => {
  try {
    const productResponse = await getProductByIdDao(id);

    if (!productResponse) {
      return false;
    }
    return productResponse;
  } catch (error) {
    return error;
  }
};

export const addProductService = async (productDetails) => {
  try {
    const productResponse = await addProductDao(productDetails);
    return productResponse;
  } catch (error) {
    return error;
  }
};

export const getCategoryService = async () => {
  try {
    const categoryResponse = await getCategoryDao();
    return categoryResponse;
  } catch (error) {
    return error;
  }
};

export const getProductsbyCategoryService = async (category) => {
  try {
    const productResponse = await getProductsbyCategoryDao(category);
    return productResponse;
  } catch (error) {
    return error;
  }
};

export const getAllProductsService = async () => {
  try {
    const productResponse = await getAllProductsDao();
    return productResponse;
  } catch (error) {
    return error;
  }
};
