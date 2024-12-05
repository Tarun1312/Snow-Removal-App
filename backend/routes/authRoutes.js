const express = require("express"); // Import express framework
const {
    registerUser, // Controller to handle user registration
    loginUser, // Controller to handle user login
    getUserDetails, // Controller to fetch user details (protected route)
    forgotPassword, // Controller to handle password reset
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware"); // Middleware to verify user authentication

const router = express.Router(); // Create a new router instance

// Route to register a new user
// Endpoint: POST /api/auth/register
// Public route - does not require authentication
router.post("/register", registerUser);

// Route to log in a user
// Endpoint: POST /api/auth/login
// Public route - does not require authentication
router.post("/login", loginUser);

// Route to fetch user details
// Endpoint: GET /api/auth/user-details
// Protected route - requires user to be authenticated
router.get("/user-details", authMiddleware, getUserDetails);

// Route to handle forgot password
// Endpoint: POST /api/auth/forgot-password
// Public route - does not require authentication
router.post("/forgot-password", forgotPassword);

module.exports = router; // Export the router for use in the main application
