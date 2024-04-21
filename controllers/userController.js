import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/userHelper.js";
import jwt from "jsonwebtoken";

const signUpController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.send({ success: false, message: "All fields are required" });
    }
    // check existing user
    const userExists = await userModel.findOne({ email });
    if (userExists) {
      return res
        .status(200)
        .send({ success: false, message: "Email already registered" });
    }
    // hashing password
    const hashedPassword = await hashPassword(password);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // Remove password from newUser object before sending the response
    newUser.password = undefined;

    return res.status(201).send({
      success: true,
      message: "User registration successful",
      newUser,
    });
  } catch (error) {
    console.log(`signUpController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in signUpController",
      error,
    });
  }
};
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.send({ success: false, message: "All fields are required" });
    }
    // console.log(email, password);
    // check existing user
    const userExists = await userModel.findOne({ email });
    if (!userExists) {
      return res
        .status(404)
        .send({ success: false, message: "Email does not exists" });
    }
    const matchPassword = await comparePassword(password, userExists.password);
    if (!matchPassword) {
      return res
        .status(401)
        .send({ success: false, message: "Incorrect Email/Password" });
    }

    const token = await jwt.sign(
      { id: userExists._id },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXP,
        // expiresIn: "7d",
      }
    );
    // Set token in cookies
    res.cookie("token", token, {
      httpOnly: true, // Cookie is only accessible via HTTP(S)
      secure: true, // Cookie is only sent over HTTPS
      sameSite: "strict", // Cookie is not sent on cross-origin requests
      maxAge: process.env.COOKIE_EXP * 24 * 60 * 60 * 1000, // 7 days expiration (in milliseconds)
    });

    return res.status(201).send({
      success: true,
      message: "Login Successful",
      name: userExists.name,
      token: token,
    });
  } catch (error) {
    console.log(`loginController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in loginController",
      error,
    });
  }
};

export { signUpController, loginController };
