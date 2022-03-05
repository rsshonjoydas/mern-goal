import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import config from "../config";
import User from "../models/userModel";

/**
 * @param  {} id
 * @desc Generate JWT token configuration function
 * @access private
 * @function uses from {@link register} {@link login}
 */
const generateToken = (id) =>
  jwt.sign({ id }, config.JWT_SECRET_TOKEN, {
    expiresIn: config.JWT_SECRET_TOKEN_EXPIRE,
  });

/**
 * @param  {} req
 * @param  {} res
 * @desc Register new user
 * @route POST /api/users
 * @access public
 * @function Generate JWT Token {@link generateToken}
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
      token: generateToken(user._id),
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
 * @function Generate JWT Token {@link generateToken}
 */
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // ? Check for user email
  const user = await User.findOne({ email });

  // ? Check for user password
  const checkPassword = await bcrypt.compare(password, user.password);

  if (user && checkPassword) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.json({ message: "Invalid credentials" });
  }
});

/**
 * @param  {} req
 * @param  {} res
 * @desc Get user information
 * @route GET /api/users/me
 * @access private
 */
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

export default { register, login, getMe };
