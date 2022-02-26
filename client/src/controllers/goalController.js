import asyncHandler from "express-async-handler";
import Goal from "../models/goalModel";

/**
 * @param  {} req
 * @param  {} res
 * @desc Get goals
 * @route GET /api/goals
 * @access Private
 */
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find();
  res.status(200).json(goals);
});

/**
 * @param  {} req
 * @param  {} res
 * @desc Post goals
 * @route POST /api/goals
 * @access Private
 */
const postGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await Goal.create({
    text: req.body.text,
  });

  res.status(200).json(goal);
});

/**
 * @param  {} req
 * @param  {} res
 * @desc Update goals
 * @route PUT /api/goals
 * @access Private
 */
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400).json({ message: "Goal not found" });
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedGoal);
});

/**
 * @param  {} req
 * @param  {} res
 * @desc Delete goals
 * @route DELETE /api/goals
 * @access Private
 */
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

export default { getGoals, postGoal, updateGoal, deleteGoal };