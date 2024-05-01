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
const isAdmin = async (req, res, next) => {
  try {
    // Assuming req.user is populated from the authentication middleware
    const user = req.user;
    // Check if user exists and if they are an admin
    if (!user || user.role !== 1) {
      return res.status(403).send({
        success: false,
        message: "Access denied. Only admins can perform this action.",
      });
    }

    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      message: "Not authorized",
      error: error.message,
    });
  }
};

export { isAuthorized, isAdmin };
