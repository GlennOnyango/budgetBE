const User = require("../models/user");
const { validationResult } = require("express-validator");
const bycrpt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.status = 422;

    next(error);
  } else {
    const email = req.body.email;
    const phone = req.body.phone;
    const password = req.body.password;

    try {
      const hashedPw = await bycrpt.hash(password, 12);

      const user = new User({
        email,
        phone,
        password: hashedPw,
      });

      const userSaved = await user.save();

      res.status(201).json({ message: "User created", userId: userSaved._id });
    } catch (err) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  }
};

exports.login = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error(errors.array()[0].msg);
    error.status = 400;
    next(error);
  } else {
    const email = req.body.email;
    const password = req.body.password;

    try {
      const loadedUser = await User.findOne({ email: email });

      const passwordCheck = await bycrpt.compare(password, loadedUser.password);

      if (!passwordCheck) {
        const error = new Error("Wrong password");
        error.status = 401;
        throw error;
      }
      const token = jwt.sign(
        { email: loadedUser.email, userId: loadedUser._id.toString() },
        "superOnyango12342905#21@",
        { expiresIn: "1hr" }
      );

      res.status(200).json({ token: token, userId: loadedUser._id.toString() });
    } catch (err) {
      if (!err.status) {
        err.status = 500;
      }
      next(err);
    }
  }
};
