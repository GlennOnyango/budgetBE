const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bundleSchema = new Schema({
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
  budget: {
    type: Schema.Types.ObjectId,
    ref: "Budget",
    required: false,
  },
  items: [
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

module.exports = mongoose.model("Bundle", bundleSchema);
