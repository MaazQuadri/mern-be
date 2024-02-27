import JWT from "jsonwebtoken";
import usersModel from "../models/usersModel.js";
export const isLogin = (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    const token = req.headers.authorization;
    const decode = JWT.verify(token, process.env.JWT_SECRET_KEY);
    req.user_id = decode._id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: `Something Went Wrong..`,
    });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = await usersModel.findById(req.user_id);
    if (user.role == 1) {
      next();
    } else {
      res.status(401).send({
        success: false,
        message: `Unauthorized Access`,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: `Error Validating Authorization`,
    });
  }
};
