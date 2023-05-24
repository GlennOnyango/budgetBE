const express = require("express");
const { body } = require("express-validator");

const route = express.Router();

const Bundle = require("../models/bundle");

const bundleController = require("../controllers/bundle");

const auth_token = require("../middleware/auth_token");

//Bundle
route.get("budget/bundle", auth_token, bundleController.getBundles);

route.post(
  "budget/bundle",
  auth_token,
  [
    body("name")
      .notEmpty()
      .withMessage("Budget name can't be empty")
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
  bundleController.createBundle
);

module.exports = route;
