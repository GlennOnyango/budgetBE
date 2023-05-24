// const Bundle = require("../models/bundle");
// const { validationResult } = require("express-validator");

// //Bundles
// exports.getBundles = async (req, res, next) => {
//   try {
//     const bundle = await Bundle.find({
//       creator: req.userId,
//     })
//       .populate("creator")
//       .sort({ createdAt: -1 });

//     res.status(200).json({
//       message: "All bundles Fetched successfully",
//       budget: bundle,
//     });
//   } catch (err) {
//     if (!err.status) {
//       err.status = 500;
//     }
//     next();
//   }
// };

// exports.getBundle = async (req, res, next) => {
//   const bundleId = req.params.bundleId;

//   try {
//     const bundle = await Bundle.findById(bundleId);

//     res.status(200).json({
//       message: "Bundle fetched",
//       bundle: bundle,
//     });
//   } catch (err) {
//     if (!err.status) {
//       err.status = 500;
//     }
//     next();
//   }
// };

// exports.createBundle = async (req, res, next) => {
//   const errors = validationResult(req);

//   if (!errors.isEmpty()) {
//     const error = new Error(errors.array()[0].msg);
//     error.status = 421;

//     next(error);
//   } else {
//     const name = req.body.name;
//     const status = req.body.status;
//     const amount = req.body.amount;
//     const creator = req.userId;

//     try {
//       const bundle = new Bundle({
//         name,
//         status,
//         amount,
//         creator,
//       });

//       const createdBundle = await bundle.save();

//       res
//         .status(201)
//         .json({ message: "Bundle created", bundleId: createdBundle._id });
//     } catch (err) {
//       if (!err.status) {
//         err.status = 500;
//       }
//       next(err);
//     }
//   }
// };

// exports.deteleBundle = async (req, res, next) => {
//   const bundleId = req.params.bundleId;

//   const bundle = Bundle.findByIdAndDelete(bundleId);

//   res.status(200).json({ message: "Bundle deleted", bundle: bundle });
  
// };

// exports.addItemsToBundle = async (req, res, next) => {
//   const bundleId = req.body.bundleId;
//   const items = req.body.items;

//   const bundleSelected = Bundle.findById(bundleId);
//   const newItems = [...bundleSelected.items, ...items];

//   let newAmount = 0;

//   bundleSelected.items.forEach((item) => {
//     newAmount += item.amount;
//   });

//   items.forEach((item) => {
//     newAmount += item.amount;
//   });

//   const bundle = Bundle.findByIdAndUpdate(bundleId, {
//     items: newItems,
//     amount: newAmount,
//   });

//   res.status(200).json({ message: "Bundle updated", bundle: bundle });
// };
