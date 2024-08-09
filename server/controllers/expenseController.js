const Expense = require("../models/Expense");

exports.getExpensesById = async (req, res) => {
  const { _id } = req.params;

  try {
    const expenses = await Expense.find({ budgetId: _id });

    if (!expenses.length) {
      return res
        .status(404)
        .json({ message: "No expenses found" });
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

    const expense = new Expense({
      ExpenseName,
      date,
      ExpenseAmount,
      budgetId: _id, 
      createdBy,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    console.error("Error creating expense:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.deleteExpense = async (req, res) => {
  const { _id } = req.params;

  try {
    const expense = await Expense.findById(_id);

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    await Expense.findByIdAndDelete(_id);

    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ error: "Server error" });
  }
};
