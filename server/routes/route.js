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


router.post("/user/signup", signupUserController);
router.post("/user/login", loginUserController);

router.get("/product", addProductsFromFakeStoreController);
router.get("/products", getAllProductsController)
router.post("/product",  addProductController);
router.get("/product/:id", getProductByIdController);
router.put("/product/:id", updateProductController);
router.post("/search", searchProductsController);
router.delete("/product/:id", deleteProductByIdController);
router.post("/product/cart", addProductToCartController);
router.get("/cart/:userId", getCartController);
router.post("/checkout");
router.get("/products/categories", getCategoryController);
router.get("/products/category/:category", getProductsbyCategoryController);

// checkout
router.post("/order/checkout", checkoutController)
router.post("/verify", paymentVerifyController)

export default router;



