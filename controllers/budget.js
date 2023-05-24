const Budget = require("../models/budget");
const Bundle = require("../models/bundle");
const Item = require("../models/item");
const { validationResult } = require("express-validator");

exports.createBudget = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.status = 421;

    next(error);
  } else {
    const name = req.body.name;
    const duration = req.body.duration;
    const limit = req.body.limit;
    const amount = req.body.amount;
    const creator = req.userId;

    try {
      const budget = new Budget({
        name,
        duration,
        limit,
        amount,
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

//Bundles
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

exports.getBundle = async (res, res, next) => {};
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

exports.addItemsToBundle = async (req, res, next) => {
  const bundleId = req.body.bundleId;
  const items = req.body.items;

  const bundleSelected = Bundle.findById(bundleId);
  const newItems = [...bundleSelected.items, ...items];

  let newAmount = 0;

  bundleSelected.items.forEach((item) => {
    newAmount += item.amount;
  });

  items.forEach((item) => {
    newAmount += item.amount;
  });

  const bundle = Bundle.findByIdAndUpdate(bundleId, {
    items: newItems,
    amount: newAmount,
  });

  res.status(200).json({ message: "Bundle updated", bundle: bundle });
};

exports.deteleBundle = async (res, res, next) => {};

//Items
exports.createItem = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.status = 421;

    next(error);
  } else {
    const name = req.body.name;
    const status = req.body.status;
    const amount = req.body.amount;
    const quantity = req.body.quantity;
    const creator = req.userId;

    try {
      const item = new Item({
        name,
        status,
        amount,
        quantity,
        creator,
      });

      const itemCreated = await item.save();

      res
        .status(201)
        .json({ message: "Item created", itemId: itemCreated._id });
    } catch (err) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  }
};

exports.getItems = async (req, res, next) => {
  try {
    const items = await Item.find({
      creator: req.userId,
    })
      .populate("creator")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "All items Fetched successfully",
      budget: items,
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next();
  }
};
