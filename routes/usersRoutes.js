import express from "express";
import {
  createUserController,
  userLoginController,
  passwordChangeController,
  forgotPasswordController,
} from "../controllers/usersContollers.js";
import { isLogin } from "../middlewares/usersMiddlewares.js";

const router = express.Router();
//http://localhost:2000/api/vi/auth
router.post("/register", createUserController);

router.post("/login", userLoginController);

router.put("/change-password", isLogin, passwordChangeController);

router.put("/forgot-password", forgotPasswordController);

router.get("/user-auth", isLogin, (req, res) => {
  return res.status(200).send({ eligible: true });
});

export default router;
