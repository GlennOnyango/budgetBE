const express = require("express");
const { body } = require("express-validator");

const route = express.Router();

const User = require("../models/user.js");

const authController = require("../controllers/auth");

route.post(
  "/signup",
  [
    body("phone")
      .notEmpty()
      .withMessage("Phone number is empty")
      .isLength({ min: 10 }),
    body("password")
      .notEmpty()
      .withMessage("Password is empty")
      .isLength({ min: 8 }),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("E-mail address already exists!");
          }
        });
      })
      .normalizeEmail(),
  ],
  authController.signUp
);

route.post(
  "/login",
  [
    body("password").isLength({ min: 8 }).notEmpty().withMessage("Password is empty"),
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email")
      .normalizeEmail(),
  ],
  authController.login
);

module.exports = route;
