const express = require("express");
const { body } = require("express-validator");

const route = express.Router();

const Budget = require("../models/budget");
const Bundle = require("../models/bundle");

const budgetController = require("../controllers/budget");

const auth_token = require("../middleware/auth_token");

//Budget -> Budget bundle -> Budget Item
route.get("/budget", auth_token, budgetController.getBudgets);

route.post(
  "/budget",
  auth_token,
  [
    body("name")
      .notEmpty()
      .withMessage("Budget name can't be empty")
      .isLength({ min: 4 })
      .trim()
      .custom((value, { req }) => {
        return Budget.findOne({ creator: req.userId, name: value }).then(
          (budget) => {
            if (budget) {
              return Promise.reject(
                "Please choose different name for your budget"
              );
            }
          }
        );
      }),
    body("budget_type").notEmpty().withMessage("Budget type cant be empty"),
  ],
  budgetController.createBudget
);

//Budget bundle -> Budget Item
route.get("budget/bundle", auth_token, budgetController.getBundles);

route.post(
  "budget/bundle",
  auth_token,
  [
    body("name")
      .notEmpty()
      .withMessage("Budge t name can't be empty")
      .isLength({ min: 4 })
      .trim()
      .custom((value, { req }) => {
        return Bundle.findOne({ creator: req.userId, name: value }).then(
          (bundle) => {
            if (bundle) {
              return Promise.reject(
                "Please choose different name for your bundle"
              );
            }
          }
        );
      }),
    body("status")
      .notEmpty()
      .isBoolean()
      .withMessage("Status is not a boolean"),
    body("amount")
      .notEmpty()
      .isNumeric()
      .withMessage("Amount should be a numeric"),
  ],
  budgetController.createBundle
);

//Budget Item
route.get("budget/item", auth_token, budgetController.getBundles);

route.post("budget/item", auth_token, [
  body("name")
    .notEmpty()
    .withMessage("Item name can't be empty")
    .isLength({ min: 4 })
    .trim()
    .custom((value, { req }) => {
      return Budget.findOne({ id: req.userId, name: value }).then((budget) => {
        if (budget) {
          return Promise.reject("Please choose different name for your item");
        }
      });
    }),
  body("status").notEmpty().isBoolean().withMessage("Status is not a boolean"),
  body("amount")
    .notEmpty()
    .isNumeric()
    .withMessage("Amount should be a numeric"),
]);

module.exports = route;
