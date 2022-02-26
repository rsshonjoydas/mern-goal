import express from "express";
import userController from "../controllers/userController";

const router = express.Router();

router
  .post("/", userController.register)
  .post("/login", userController.login)
  .get("/me", userController.getMe);

export default router;
