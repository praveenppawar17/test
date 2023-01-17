import express from "express";
const router = express.Router();
import {
  addProductToCartController,
  getCartController,
} from "../controller/cartController.js";
import { checkoutController, paymentVerifyController } from "../controller/orderController.js";

import {
  addProductController,
  addProductsFromFakeStoreController,
  deleteProductByIdController,
  getAllProductsController,
  getCategoryController,
  getProductByIdController,
  getProductsbyCategoryController,
  searchProductsController,
  updateProductController,
} from "../controller/productController.js";
import {
  loginUserController,
  signupUserController,
} from "../controller/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";


router.post("/user/signup", signupUserController);
router.post("/user/login", loginUserController);

router.get("/product", addProductsFromFakeStoreController);
router.get("/products", verifyToken, getAllProductsController)
router.post("/product",  verifyToken, addProductController);
router.get("/product/:id", verifyToken, getProductByIdController);
router.put("/product/:id", verifyToken, updateProductController);
router.post("/search", searchProductsController);
router.delete("/product/:id", verifyToken, deleteProductByIdController);
router.post("/product/cart", verifyToken, addProductToCartController);
router.get("/cart/:userId", verifyToken, getCartController);
router.get("/products/categories", verifyToken,getCategoryController);
router.get("/products/category/:category", verifyToken,getProductsbyCategoryController);

// checkout
router.post("/order/checkout", verifyToken,checkoutController)
router.post("/verify", verifyToken,paymentVerifyController)

export default router;



