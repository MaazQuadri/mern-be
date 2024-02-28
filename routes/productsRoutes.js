import express from "express";
import { isAdmin, isLogin } from "../middlewares/usersMiddlewares.js";
import formidable from "express-formidable";
import {
  createProductController,
  getAllProductsController,
  getProductPhotoController,
  editProductController,
} from "../controllers/productsController.js";

const router = express.Router();

router.post(
  "/new-product",
  isLogin,
  isAdmin,
  formidable(),
  createProductController
);

router.get("/allProducts", getAllProductsController);

router.get("/product-photo/:pid", getProductPhotoController);

router.put(
  "/edit-product/:pid",
  isLogin,
  isAdmin,
  formidable(),
  editProductController
);

//http://localhost:2000/api/v1/products/354asdsdf35

export default router;
