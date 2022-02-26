import express from "express";
import goalRoutes from "./goalRoutes";
import userRoutes from "./userRoute";

const router = express.Router();

router.use("/api/goals", goalRoutes).use("/api/users", userRoutes);

const configure = (app) => {
  app.use(router);
};

export default configure;
