const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    ExpenseName: {
      type: String,
      required: true,
    },
    ExpenseAmount: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    createdBy: {
      type: String,
      ref: "User",
      required: true,
    },
    budgetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Budget",
      required: true,
      unique:false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
