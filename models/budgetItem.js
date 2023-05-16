const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const budgetItemSchema = new Schema({
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
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bundle: {
    type: Schema.Types.ObjectId,
    ref: "Bundle",
    required: false,
  },
});

module.exports = mongoose.model("Bundle", budgetItemSchema);
