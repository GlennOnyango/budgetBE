const Item = require("../models/item");
const { validationResult } = require("express-validator");

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
      message: "Items Fetched",
      items: items,
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next();
  }
};

//write a function to get a single item
exports.getItem = async (req, res, next) => {
  const itemId = req.params.itemId;

  try {
    const item = await Item.findOne({
      creator: req.userId,
      _id: itemId,
    });

    if (!item) {
      const error = new Error("Item not found");
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      message: "Item Fetched",
      item: item,
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next();
  }
};

//write a function to update a single item
exports.updateItem = async (req, res, next) => {
  const itemId = req.params.itemId;
  const name = req.body.name;
  const status = req.body.status;
  const amount = req.body.amount;
  const quantity = req.body.quantity;
  const creator = req.userId;

  try {
    const item = await Item.findOne({
      creator: req.userId,
      _id: itemId,
    });

    if (!item) {
      const error = new Error("Item not found");
      error.status = 404;
      throw error;
    }

    item.name = name;
    item.status = status;
    item.amount = amount;
    item.quantity = quantity;
    item.creator = creator;

    const itemUpdated = await item.save();

    res.status(200).json({
      message: "Item Updated",
      budget: itemUpdated,
    });
  } catch (err) {
    if (!err.status) {
      err.status = 500;
    }
    next();
  }
};

//write a function to delete a single item
exports.deleteItem = async (req, res, next) => {
  const itemId = req.params.itemId;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.status = 421;

    next(error);
  } else {
    try {
      const item = await Item.findByIdAndDelete(itemId);

      if (!item) {
        const error = new Error("Item not found");
        error.status = 404;
        throw error;
      }

      res.status(200).json({
        message: "Item Deleted",
        item: item,
      });
    } catch (err) {
      if (!err.status) {
        err.status = 500;
      }
      next();
    }
  }
};
