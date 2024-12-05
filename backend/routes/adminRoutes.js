const express = require("express"); // Import the express framework
const {
    getAllBookings, // Controller function to retrieve all bookings
    deleteBooking, // Controller function to delete a specific booking
    getAllSubscriptions, // Controller function to retrieve all subscriptions
    cancelSubscription, // Controller function to cancel a specific subscription
} = require("../controllers/adminController");

const authMiddleware = require("../middleware/authMiddleware"); // Middleware to authenticate users
const adminMiddleware = require("../middleware/adminMiddleware"); // Middleware to check admin access

const router = express.Router(); // Create a new router instance

// Route to get all bookings
// Requires user to be authenticated and have admin privileges
router.get("/bookings", authMiddleware, adminMiddleware, getAllBookings);

// Route to delete a specific booking
// Requires user to be authenticated and have admin privileges
router.delete("/bookings/:id", authMiddleware, adminMiddleware, deleteBooking);

// Route to get all subscriptions
// Requires user to be authenticated and have admin privileges
router.get("/subscriptions", authMiddleware, adminMiddleware, getAllSubscriptions);

// Route to cancel a specific subscription
// Requires user to be authenticated and have admin privileges
router.delete("/subscriptions/:id", authMiddleware, adminMiddleware, cancelSubscription);

module.exports = router; // Export the router for use in the main application
