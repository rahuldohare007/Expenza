const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/budgetController");
const expenseController = require("../controllers/expenseController");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/create", authenticateToken, budgetController.createBudget);
router.get("/user", authenticateToken, budgetController.getUserBudgets);
router.get(
  "/expenses/:id",
  authenticateToken,
  expenseController.getExpensesById
);

module.exports = router;
