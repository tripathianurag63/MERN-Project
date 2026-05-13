import jwt from "jsonwebtoken";
import { User } from "../models/user-model.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "Access token is missing or invalid",
      });
    }
 // Bearer lakjhsduiqwndikasnmchdaikcj
    const token = authHeader.split(" ")[1];
    try {
      let decodedInfo = jwt.verify(token, process.env.JWT_SECRET);
      const { id } = decodedInfo;
      const user = await User.findById(id);

      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found",
        });
      }
      req.userId = user._id;
      next();
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        return res.status(400).json({
          success: false,
          message:
            "accessToken has expired, use refreshToken to generate new accessToken",
        });
      }
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};