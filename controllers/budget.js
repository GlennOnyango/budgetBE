// const Budget = require("../models/budget");
// const { validationResult } = require("express-validator");

// exports.createBudget = async (req, res, next) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     const error = new Error(errors.array()[0].msg);
//     error.status = 421;

//     next(error);
//   } else {
//     const name = req.body.name;
//     const duration = req.body.duration;
//     const limit = req.body.limit;
//     const amount = req.body.amount;
//     const creator = req.userId;

//     try {
//       const budget = new Budget({
//         name,
//         duration,
//         limit,
//         amount,
//         creator,
//       });

//       const createdBudget = await budget.save();

//       res
//         .status(201)
//         .json({ message: "Budget created", budgetId: createdBudget._id });
//     } catch (err) {
//       if (!err.status) {
//         err.status = 500;
//       }
//       next(err);
//     }
//   }
// };

// exports.getBudgets = async (req, res, next) => {
//   try {
//     const budget = await Budget.find({
//       creator: req.userId,
//     })
//       .populate("creator")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       message: "All budgets Fetched successfully",
//       budget: budget,
//     });
//   } catch (err) {
//     if (!err.status) {
//       err.status = 500;
//     }
//     next();
//   }
// };
