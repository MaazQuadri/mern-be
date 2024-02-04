import express from "express";
import { isAdmin, isLogin } from "../middlewares/usersMiddlewares.js";
import formidable from "express-formidable";
import { createProductController } from "../controllers/productsController.js";

const router = express.Router();

router.post(
  "/new-product",
  isLogin,
  isAdmin,
  formidable(),
  createProductController
);

export default router;
