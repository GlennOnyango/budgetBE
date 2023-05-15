const Budget = require("../models/budget");
const { validationResult } = require("express-validator");

exports.createBudget = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.status = 421;

    next(error);
  } else {
    const name = req.body.name;
    const budgetType = req.body.budget_type;
    const creator = req.userId;

    try {
      const budget = new Budget({
        name,
        budgetType,
        creator,
      });

      const createdBudget = await budget.save();

      res
        .status(201)
        .json({ message: "Budget created", budgetId: createdBudget._id });
    } catch (err) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  }
};

exports.getBudgets = async (req, res, next) => {
  console.log(req.userId);
  try {
    const budget = await Budget.find({
      creator: req.userId,
    })
      .populate("creator")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All budgets Fetched successfully",
      budget: budget,
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next();
  }
};
