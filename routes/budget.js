const express = require("express");
const { body } = require("express-validator");

const route = express.Router();

const Budget = require("../models/budget");

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

module.exports = route;
