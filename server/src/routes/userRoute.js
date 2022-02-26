import express from "express";
import userController from "../controllers/userController";
import protect from "../middlewares/authMiddleware";

const router = express.Router();

router
  .post("/", userController.register)
  .post("/login", userController.login)
  .get("/me", protect, userController.getMe);

export default router;
