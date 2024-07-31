const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/budgetController");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/create", authenticateToken, budgetController.createBudget);
router.get("/user", authenticateToken, budgetController.getUserBudgets);


module.exports = router;
