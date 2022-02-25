import express from "express";
import goalController from "../controllers/goalController";

const router = express.Router();

router.route("").get(goalController.getGoals).post(goalController.postGoal);
router.route("/:id").put(goalController.updateGoal).delete(goalController.deleteGoal);

export default router;
