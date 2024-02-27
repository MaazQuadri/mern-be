import express from "express";
import { isLogin, isAdmin } from "../middlewares/usersMiddlewares.js";
import {
  createCategoryController,
  getProductCategory,
} from "../controllers/categoryControllers.js";

const router = express.Router();

router.post("/new-category", isLogin, isAdmin, createCategoryController);

router.get("/all-categories", getProductCategory);
//page=10, pageSize=50

//Edit Category

//Delete Category

export default router;
