const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const budgetSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  duration: {
    type: String,
    required: true,
  },
  limit: {
    type: Number,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  parent: {
    type: Schema.Types.ObjectId,
    ref: "Budget",
    required: false,
  },
  childrenBudget: [
    {
      type: Schema.Types.ObjectId,
      ref: "Bundle",
    },
  ],
  childrenBundle: [
    {
      type: Schema.Types.ObjectId,
      ref: "Bundle",
    },
  ],
  childrenItem: [
    {
      name: {
        type: String,
        required: false,
      },
      status: {
        type: Boolean,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model("Budget", budgetSchema);
