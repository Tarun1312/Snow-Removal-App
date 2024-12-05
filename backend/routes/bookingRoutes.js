const express = require("express"); // Import the express framework
const { 
    createBooking, // Controller for creating a new booking
    getUserAppointments, // Controller for fetching user-specific appointments
    deleteAppointment, // Controller for deleting a specific appointment
} = require("../controllers/bookingController");

const authMiddleware = require("../middleware/authMiddleware"); // Middleware to verify user authentication

const router = express.Router(); // Create a new router instance

/**
 * Route: POST /api/bookings/
 * Description: Creates a new booking for the authenticated user.
 * Middleware: authMiddleware ensures the user is logged in.
 * Access: Protected
 */
router.post("/", authMiddleware, createBooking);

/**
 * Route: GET /api/bookings/user-appointments
 * Description: Fetches all appointments specific to the logged-in user.
 * Middleware: authMiddleware ensures the user is logged in.
 * Access: Protected
 */
router.get("/user-appointments", authMiddleware, getUserAppointments);

/**
 * Route: DELETE /api/bookings/:id
 * Description: Deletes a specific appointment for the logged-in user based on the appointment ID.
 * Middleware: authMiddleware ensures the user is logged in.
 * Access: Protected
 */
router.delete("/:id", authMiddleware, deleteAppointment);

module.exports = router; // Export the router for use in the main application
