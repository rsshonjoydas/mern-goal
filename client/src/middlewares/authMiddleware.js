/* eslint-disable prefer-destructuring */
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/userModel";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      // ? Get token from header
      token = req.headers.authorization.split(" ")[1];

      // ? Verify token
      const decoded = jwt.verify(token, config.JWT_SECRET_TOKEN);

      // ? Get user from the token
      req.user = await User.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.log(error);
      res.status(401).json({ message: "Not authorized" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
});

export default protect;
