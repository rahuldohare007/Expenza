const Expense = require("../models/Expense");

exports.getExpensesById = async (req, res) => {
  const { _id } = req.params;

  try {
    const expenses = await Expense.find({ budgetId: _id });

    if (!expenses.length) {
      return res
        .status(404)
        .json({ message: "No expenses found for this budget" });
    }

    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.createExpenses = async (req, res) => {
  try {
    const { name, amount } = req.body;
    const { _id } = req.params; // Extract _id from URL parameters
    const createdBy = req.user; // Assuming user email is added to req.user by authenticateToken middleware
    const date = new Date(); // Use current date for expense date

    if (!name || !amount || !_id) {
      return res
        .status(400)
        .json({ message: "Name, amount, and budget ID are required." });
    }

    // Create the new expense
    const expense = new Expense({
      name,
      date,
      amount,
      budgetId: _id, // Use _id as budgetId
      createdBy,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
