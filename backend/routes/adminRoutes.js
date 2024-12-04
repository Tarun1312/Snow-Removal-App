const express = require("express");
const {
    getAllBookings,
    deleteBooking,
    updateBooking,
    getAllSubscriptions,
    updateSubscriptionPlan,
} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware"); // Custom middleware to verify admin role

const router = express.Router();

// Routes
router.get("/bookings", authMiddleware, adminMiddleware, getAllBookings); // View all bookings
router.delete("/bookings/:id", authMiddleware, adminMiddleware, deleteBooking); // Delete booking
router.put("/bookings/:id", authMiddleware, adminMiddleware, updateBooking); // Update booking
router.get("/subscriptions", authMiddleware, adminMiddleware, getAllSubscriptions); // View subscriptions
router.put("/subscriptions/:planId", authMiddleware, adminMiddleware, updateSubscriptionPlan); // Update subscription plan

module.exports = router;
