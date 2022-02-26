import asyncHandler from "express-async-handler";

/**
 * @param  {} req
 * @param  {} res
 * @desc Register new user
 * @route POST /api/users
 * @access public
 */
const register = asyncHandler(async (req, res) => {
  res.json({ message: "register user" });
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
