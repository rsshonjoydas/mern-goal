import express from "express";
import goalController from "../controllers/goalController";
import protect from "../middlewares/authMiddleware";

const router = express.Router();

router.route("").get(protect, goalController.getGoals).post(protect, goalController.postGoal);
router
  .route("/:id")
  .put(protect, goalController.updateGoal)
  .delete(protect, goalController.deleteGoal);

export default router;
