const Budget = require("../models/Budget");

exports.createBudget = async (req, res) => {
  try {
    const { icon, budgetName, budgetAmount, createdBy } = req.body;
    
    if (!budgetName || !budgetAmount) {
      return res.status(400).json({ error: "Budget Name and Amount are required" });
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

exports.getUserBudgets = async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  try {
    const budgets = await Budget.aggregate([
      {
        $match: { createdBy: email }
      },
      {
        $lookup: {
          from: 'expenses',        
          localField: '_id',
          foreignField: 'budgetId',
          as: 'expenses'
        }
      },
      {
        $addFields: {
          totalSpend: { $sum: "$expenses.amount" },
          totalItem: { $size: "$expenses" }
        }
      },
      {
        $project: {
          expenses: 0           
        }
      }
    ]);

    res.status(200).json(budgets);
  } catch (error) {
    console.error("Error fetching budgets:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
