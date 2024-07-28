const express = require("express");
const router = express.Router();
const budgetController = require("../controllers/budgetController");

router.post("/create", budgetController.createBudget);
router.get("/user", budgetController.getUserBudgets);

module.exports = router;
