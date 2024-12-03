const express = require("express");
const { createBooking, getUserAppointments, deleteAppointment } = require("../controllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create a new booking
router.post("/", authMiddleware, createBooking);

// Get user-specific appointments
router.get("/user-appointments", authMiddleware, getUserAppointments);

// Delete a specific appointment
router.delete("/:id", authMiddleware, deleteAppointment);

module.exports = router;
