const Budget = require("../models/budget");
const Bundle = require("../models/bundle");
const BudgetItem = require("../models/budgetItem");
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

exports.createBundle = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.status = 421;

    next(error);
  } else {
    const name = req.body.name;
    const status = req.body.status;
    const amount = req.body.amount;
    const creator = req.userId;

    try {
      const bundle = new Bundle({
        name,
        status,
        amount,
        creator,
      });

      const createdBundle = await bundle.save();

      res
        .status(201)
        .json({ message: "Bundle created", bundleId: createdBundle._id });
    } catch (err) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  }
};

exports.getBundles = async (req, res, next) => {
  try {
    const bundle = await Bundle.find({
      creator: req.userId,
    })
      .populate("creator")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All bundles Fetched successfully",
      budget: bundle,
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next();
  }
};

exports.createBudgetItem = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.status = 421;

    next(error);
  } else {
    const name = req.body.name;
    const status = req.body.status;
    const amount = req.body.amount;
    const creator = req.userId;

    try {
      const budgetItem = new BudgetItem({
        name,
        status,
        amount,
        creator,
      });

      const createdBudget = await budgetItem.save();

      res
        .status(201)
        .json({ message: "Item created", itemId: createdBudget._id });
    } catch (err) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  }
};

exports.getBundles = async (req, res, next) => {
  try {
    const budgetItem = await BudgetItem.find({
      creator: req.userId,
    })
      .populate("creator")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All items Fetched successfully",
      budget: budgetItem,
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next();
  }
};
