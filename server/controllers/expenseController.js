exports.getExpensesById = async (req, res) => {
  const { _id } = req.params;

  try {
    const expenses = await Expense.find({ budgetId: _id });

    if (!expenses.length) {
      return res.status(404).json({ message: "No expenses found for this budget" });
    }

    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error fetching expenses:", error);
    res.status(500).json({ message: "Server error" });
  }
};