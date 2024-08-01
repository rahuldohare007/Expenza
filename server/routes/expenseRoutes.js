const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authMiddleware");
const expenseController = require("../controllers/expenseController");

router.get(
  "/:_id",
  authenticateToken,
  expenseController.getExpensesById
);

router.post("/:_id/create",authenticateToken,expenseController.createExpenses)
router.delete('/:_id/delete', authenticateToken,expenseController.deleteExpense)

module.exports = router;
