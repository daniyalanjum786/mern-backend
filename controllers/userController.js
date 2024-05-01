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
      id: userExists._id,
      role: userExists.role,
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
const updateProfileController = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user.id;
    // console.log(req.user.email);

    // Optional: Check if the email has changed and if it's taken
    if (email && email !== req.user.email) {
      const emailExists = await userModel.findOne({ email });
      if (emailExists) {
        return res.status(400).send({
          success: false,
          message: "Email already in use by another account.",
        });
      }
    }
    // Update user
    const updatedUser = await userModel
      .findByIdAndUpdate(
        userId,
        {
          name,
          email,
        },
        { new: true, runValidators: true }
      )
      .select("-password");

    if (!updatedUser) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    return res.status(200).send({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(`updateProfileController Error - ${error}`);
    res.status(500).send({
      success: false,
      message: "Error in updateProfileController",
      error,
    });
  }
};
const logoutController = (req, res) => {
  // Clear token cookie
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0), // Set expiry date to past to immediately expire the cookie
    secure: true, // Set to true if served over HTTPS
    sameSite: "strict", // Set to 'strict' to prevent CSRF attacks
  });

  // Send response indicating successful logout
  res.status(200).send({ success: true, message: "Logout successful" });
};
const profileController = async (req, res) => {
  const id = req.user.id;

  const userDetails = await userModel.findById(id).select("-password");

  return res.status(200).send({
    success: true,
    userDetails,
  });
};
const allUsersController = async (req, res) => {
  try {
    const users = await userModel.find({});

    return res.status(200).send({
      success: true,
      message: users.length,
      users,
    });
  } catch (error) {}
};
export {
  signUpController,
  loginController,
  logoutController,
  profileController,
  updateProfileController,
  allUsersController,
};
