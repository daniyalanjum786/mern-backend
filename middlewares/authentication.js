import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
const isAuthorized = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .send({ success: false, message: "Please login to access this page" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await userModel.findById(decodedToken.id);
    // console.log(req.user);
    next();
  } catch (error) {
    return res
      .status(401)
      .send({ success: false, message: "Invalid or expired token" });
  }
};

export { isAuthorized };
