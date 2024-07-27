const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/budgetController");

// Create a new budget
router.post("/create", budgetController.createBudget);

// Get budgets for a specific user
router.get("/user", budgetController.getUserBudgets);

module.exports = router;
