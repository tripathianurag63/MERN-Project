import { User } from "../models/user-model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { verifyMail } from "../config/verify-mail.js";

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All input fields are required!!",
      });
    }

    const isExistingUser = await User.findOne({ email });
    if (isExistingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists!!",
      });
    }

    //! password hash
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      email,
    });

    //! generate token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    //todo--> Email Verification
    verifyMail(token, email);
    newUser.token = token;
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User Created",
      data: newUser,
    });
  } catch (error) {
    console.log(error);
    
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All input fields are required!!",
      });
    }

    const user = await User.findOne({ email });

    if(!user){
      return res.status(400).json({
        success: false,
        message: "User does not exist!!",
      });
    }

    const isPassword = await bcrypt.compare(password, user.password);

    if(!isPassword){
      return res.status(400).json({
        success: false,
        message: "Password is incorrect!!",
      });
    }
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
    
  }
};