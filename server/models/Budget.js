const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema(
  {
    icon: {
      type: String,
      required: true,
    },
    budgetName: {
      type: String,
      required: true,
    },
    budgetAmount: {
      type: Number,
      required: true,
    },
    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Budget", budgetSchema);
