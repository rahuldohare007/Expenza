const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/budgetController");
const authenticateToken = require("../middleware/authMiddleware");

router.get("/user", authenticateToken, budgetController.getUserBudgets);
router.post("/create", authenticateToken, budgetController.createBudget);
router.put("/:_id/update", authenticateToken, budgetController.updateBudget);
router.delete('/:_id/delete', authenticateToken,budgetController.deleteBudget)

module.exports = router;
