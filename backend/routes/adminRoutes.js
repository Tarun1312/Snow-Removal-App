const express = require("express");
const { getAllBookings, deleteBooking, getAllSubscriptions, cancelSubscription } = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Route to get all bookings
router.get("/bookings", authMiddleware, adminMiddleware, getAllBookings);

// Route to delete a booking
router.delete("/bookings/:id", authMiddleware, adminMiddleware, deleteBooking);

// Route to get all subscriptions
router.get("/subscriptions", authMiddleware, adminMiddleware, getAllSubscriptions);

// Route to cancel a subscription
router.delete("/subscriptions/:id", authMiddleware, adminMiddleware, cancelSubscription);

module.exports = router;
