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
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

budgetSchema.virtual('totalSpend', {
  ref: 'Expense',
  localField: '_id',
  foreignField: 'budgetId',
  justOne: false,
});

budgetSchema.virtual('totalItem', {
  ref: 'Expense',
  localField: '_id',
  foreignField: 'budgetId',
  count: true,
});

budgetSchema.set('toObject', { virtuals: true });
budgetSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Budget", budgetSchema);

