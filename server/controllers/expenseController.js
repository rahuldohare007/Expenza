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
    const { ExpenseName, ExpenseAmount, createdBy } = req.body;
    const { _id } = req.params; 
    const date = new Date(); 

    if (!ExpenseName || !ExpenseAmount || !_id) {
      return res
        .status(400)
        .json({ message: "Name, amount, and budget ID are required." });
    }

    // Create the new expense
    const expense = new Expense({
      ExpenseName,
      date,
      ExpenseAmount,
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
