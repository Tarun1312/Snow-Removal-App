const express = require("express");
const { getPlans, subscribeToPlan, getSubscriptionDetails } = require("../controllers/subscriptionController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Route to get all plans
router.get("/plans", getPlans);

// Route to subscribe to a plan (protected route)
router.post("/subscribe", authMiddleware, subscribeToPlan);

// Route to get subscription details (protected route)
router.get("/details", authMiddleware, getSubscriptionDetails);

module.exports = router;
