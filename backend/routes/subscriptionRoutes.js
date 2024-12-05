const express = require("express"); // Import the express framework
const { 
    getPlans, // Controller for fetching all subscription plans
    subscribeToPlan, // Controller for subscribing to a plan
    getSubscriptionDetails, // Controller for fetching subscription details
} = require("../controllers/subscriptionController");

const authMiddleware = require("../middleware/authMiddleware"); // Middleware to verify user authentication

const router = express.Router(); // Create a new router instance

/**
 * Route: GET /api/subscriptions/plans
 * Description: Fetches all available subscription plans.
 * Access: Public
 */
router.get("/plans", getPlans);

/**
 * Route: POST /api/subscriptions/subscribe
 * Description: Subscribes an authenticated user to a specific plan.
 * Middleware: authMiddleware ensures the user is logged in.
 * Access: Protected
 */
router.post("/subscribe", authMiddleware, subscribeToPlan);

/**
 * Route: GET /api/subscriptions/details
 * Description: Fetches subscription details for the authenticated user.
 * Middleware: authMiddleware ensures the user is logged in.
 * Access: Protected
 */
router.get("/details", authMiddleware, getSubscriptionDetails);

module.exports = router; // Export the router for use in the main application
