const express = require("express");
const { getPlans, subscribeToPlan } = require("../controllers/subscriptionController");
const authMiddleware = require("../middleware/authMiddleware.js");
const router = express.Router();

// Route to get all plans
router.get("/", getPlans);

// Route to subscribe to a plan (protected route)
router.post("/subscribe", authMiddleware, subscribeToPlan);

module.exports = router;
