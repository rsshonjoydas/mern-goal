import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import User from "../models/userModel";

/**
 * @param  {} req
 * @param  {} res
 * @desc Register new user
 * @route POST /api/users
 * @access public
 */
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Please add all required fields" });
  }

  // ? check if user already exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ message: "User already exists" });
  }

  // ? Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // ? Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});

/**
 * @param  {} req
 * @param  {} res
 * @desc Authenticate a user
 * @route POST /api/users/login
 * @access public
 */
const login = asyncHandler(async (req, res) => {
  res.json({ message: "login user" });
});

/**
 * @param  {} req
 * @param  {} res
 * @desc Get user information
 * @route GET /api/users/me
 * @access public
 */
const getMe = asyncHandler(async (req, res) => {
  res.json({ message: "get user information" });
});

export default { register, login, getMe };
