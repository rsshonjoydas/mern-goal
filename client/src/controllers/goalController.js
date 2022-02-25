/**
 * @param  {} req
 * @param  {} res
 * @desc Get goals
 * @route GET /api/goals
 * @access Private
 */
const getGoals = (req, res) => {
  res.status(200).json({ message: "Get goals" });
};

/**
 * @param  {} req
 * @param  {} res
 * @desc Post goals
 * @route POST /api/goals
 * @access Private
 */
const postGoal = (req, res) => {
  res.status(200).json({ message: "Set goal" });
};

/**
 * @param  {} req
 * @param  {} res
 * @desc Update goals
 * @route PUT /api/goals
 * @access Private
 */
const updateGoal = (req, res) => {
  res.status(200).json({ message: `Update goal ${req.params.id}` });
};

/**
 * @param  {} req
 * @param  {} res
 * @desc Delete goals
 * @route DELETE /api/goals
 * @access Private
 */
const deleteGoal = (req, res) => {
  res.status(200).json({ message: `Delete goal ${req.params.id}` });
};

export default { getGoals, postGoal, updateGoal, deleteGoal };
