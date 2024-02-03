import JWT from "jsonwebtoken";
export const isLogin = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decode = JWT.verify(token, process.env.JWT_SECRET_KEY);
    req.user_id = decode._id;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).send({
      success: false,
      message: `Something Went Wrong`,
    });
  }
};
