const express = require("express");
const { body, param } = require("express-validator");

const route = express.Router();

const item = require("../models/item");

const itemController = require("../controllers/item");

const auth_token = require("../middleware/auth_token");

//Item

route.get(
  "/get-item/:itemId",
  [
    param("itemId").notEmpty().withMessage("Item Id can't be empty").trim(),
    param("id").isMongoId().withMessage("Item Id is not a valid Mongo Id"),
    param("id").custom((value, { req }) => {
      return item
        .findOne({ creator: req.userId, _id: value })
        .then((budget) => {
          if (!budget) {
            return Promise.reject("Issue with the item id");
          }
        });
    }),
  ],
  auth_token,
  itemController.getItem
);

route.get("/get-items", auth_token, itemController.getItems);

route.post(
  "/create-item",
  auth_token,
  [
    body("name")
      .notEmpty()
      .withMessage("Item name can't be empty")
      .isLength({ min: 4 })
      .trim()
      .custom((value, { req }) => {
        return item
          .findOne({ creator: req.userId, name: value })
          .then((budget) => {
            if (budget) {
              return Promise.reject(
                "Please choose different name for your item"
              );
            }
          });
      }),
    body("status")
      .notEmpty()
      .isBoolean()
      .withMessage("Status is not a boolean"),
    body("amount")
      .notEmpty()
      .isNumeric()
      .withMessage("Amount should be a numeric"),
    body("quantity")
      .notEmpty()
      .isNumeric()
      .withMessage("Quantity should be a numeric"),
  ],
  itemController.createItem
);

route.put(
  "/edit-item/:itemId",
  [
    param("itemId").notEmpty().withMessage("Item Id can't be empty").trim(),
    param("itemId").isMongoId().withMessage("Item Id is not a valid Mongo Id"),
    param("itemId").custom((value, { req }) => {
      return item
        .findOne({ creator: req.userId, _id: value })
        .then((budget) => {
          if (!budget) {
            return Promise.reject("Issue with the item id");
          }
        });
    }),
  ],
  auth_token,
  itemController.updateItem
);

route.delete(
  "/delete-item/:itemId",
  auth_token,
  [
    param("itemId").notEmpty().withMessage("Item Id can't be empty").trim(),
    param("itemId").isMongoId().withMessage("Item Id is not a valid Mongo Id"),
    param("itemId").custom((value, { req }) => {
      return item.find({ creator: req.userId, _id: value }).then((budget) => {
        if (!budget) {
          return Promise.reject("Issue with the item id");
        }
      });
    }),
  ],
  itemController.deleteItem
);

//Add

module.exports = route;
