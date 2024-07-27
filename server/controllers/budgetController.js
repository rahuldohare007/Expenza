// controllers/budgetController.js
const Budget = require("../models/Budget");

// Create a new budget
exports.createBudget = async (req, res) => {
  console.log('Request Body:', req.body);
  try {
    const { icon, budgetName, budgetAmount, createdBy } = req.body;

    if (!budgetName || !budgetAmount) {
      return res
        .status(400)
        .json({ error: "Budget Name and Amount are required" });
    }

    const newBudget = new Budget({
      icon,
      budgetName,
      budgetAmount,
      createdBy,
    });

    await newBudget.save();
    res.status(201).json(newBudget);
  } catch (error) {
    console.error("Error creating budget:", error);
    res.status(500).json({ error: "Error creating budget" });
  }
};

// Get budgets for a specific user
exports.getUserBudgets = async (req, res) => {
  const { email } = req.query;
  console.log("Requested email:", email);  // Debugging

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const budgets = await Budget.find({ createdBy: email });
    console.log("Found budgets:", budgets); 
    res.status(200).json(budgets);
  } catch (error) {
    console.error("Error fetching budgets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
