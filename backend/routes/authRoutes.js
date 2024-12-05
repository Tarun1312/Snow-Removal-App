const express = require("express");
const {
    registerUser,
    loginUser,
    getUserDetails,
    forgotPassword, // Add forgot password controller
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// User details route (protected)
router.get("/user-details", authMiddleware, getUserDetails);

// Forgot Password route
router.post("/forgot-password", forgotPassword);

module.exports = router;
