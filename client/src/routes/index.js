import express from "express";
import goalRoutes from "./goalRoutes";

const router = express.Router();

router.use("/api/goals", goalRoutes);

const configure = (app) => {
  app.use(router);
};

export default configure;
