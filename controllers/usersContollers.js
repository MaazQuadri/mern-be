import usersModel from "../models/usersModel.js";
import {
  comparePasswords,
  compareQuestion,
  hashPassword,
  hashQuestion,
} from "../utils/authHelpers.js";
import JWT from "jsonwebtoken";
export const createUserController = async (req, res) => {
  try {
    const { fullname, email, password, phone, address, question } = req.body;
    if (!fullname) {
      return res
        .status(401)
        .send({ success: false, message: `Fullname is Required` });
    }
    if (!email) {
      return res
        .status(401)
        .send({ success: false, message: `Email is Required` });
    }
    if (!password) {
      return res
        .status(401)
        .send({ success: false, message: `Password is Required` });
    }
    if (!phone) {
      return res
        .status(401)
        .send({ success: false, message: `Phone is Required` });
    }
    if (!address) {
      return res
        .status(401)
        .send({ success: false, message: `Address is Required` });
    }
    if (!question) {
      return res
        .status(401)
        .send({ success: false, message: `Security Question is Required` });
    }
    const userExists = await usersModel.findOne({ email }); //{email: user's email}
    if (userExists) {
      return res
        .status(401)
        .send({ success: false, message: `Email is already registered` });
    }
    const hashedUserPassword = await hashPassword(password);
    const hashedUserQuestion = await hashQuestion(question);
    const newUser = await new usersModel({
      fullname,
      email,
      password: hashedUserPassword,
      phone,
      address,
      question: hashedUserQuestion,
    }).save();
    // await newUser.save()
    res.status(201).send({
      success: true,
      message: `New User Registered`,
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(405).send({
      success: false,
      message: `Something Went Wrong`,
      error,
    });
  }
};

export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(401)
        .send({ success: false, message: `Credentials are Required!` });
    }
    const userExists = await usersModel.findOne({ email });
    if (!userExists) {
      return res
        .status(401)
        .send({ success: false, message: `Email is not registered` });
    }
    const matchPassword = await comparePasswords(password, userExists.password);
    if (!matchPassword) {
      return res
        .status(401)
        .send({ success: false, message: `Invalid Credentials` });
    }
    const token = JWT.sign(
      { _id: userExists._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "3d" }
    );

    // console.log(token);
    res.status(200).send({
      success: true,
      message: `Login Successful`,
      data: userExists,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: `Something Went Wrong`,
      error,
    });
  }
};

export const passwordChangeController = async (req, res) => {
  try {
    const { old_password, new_password } = req.body;
    if (!old_password || !new_password) {
      return res
        .status(401)
        .send({ success: false, message: `Credentials are Required` });
    }
    const user = await usersModel.findById(req.user_id);
    const matchPassword = await comparePasswords(old_password, user.password);
    if (!matchPassword) {
      return res
        .status(401)
        .send({ success: false, message: `Incorrect Old Password` });
    }
    const newHashedPassword = await hashPassword(new_password);
    user.password = newHashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: `Password Change Successful`,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: `Something Went Wrong`,
    });
  }
};

export const forgotPasswordController = async (req, res) => {
  try {
    const { email, newPassword, question } = req.body;
    if (!email) {
      return res
        .status(401)
        .send({ success: false, message: `Email is required` });
    }
    if (!newPassword) {
      return res
        .status(401)
        .send({ success: false, message: `New Password is required` });
    }
    if (!question) {
      return res.status(401).send({
        success: false,
        message: `Please answer the security question`,
      });
    }
    const user = await usersModel.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .send({ success: false, message: "Email is not registered" });
    }
    const compareUserQuestion = await compareQuestion(question, user.question);
    if (!compareUserQuestion) {
      return res.status(401).send({
        success: false,
        message: `Security Answer is Incorrect`,
      });
    }
    const hashedNewPassword = await hashPassword(newPassword);
    user.password = hashedNewPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: `Password update successful`,
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: `Something Went Wrong`,
    });
  }
};
