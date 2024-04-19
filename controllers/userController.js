import userModel from "../models/userModel.js";
import { hashPassword } from "../helpers/userHelper.js";

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

export { signUpController };
