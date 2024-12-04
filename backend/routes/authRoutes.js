const express = require("express");
const { registerUser, loginUser, getUserDetails } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Register route
router.post("/register", registerUser);

// Login route
router.post("/login", loginUser);

// User details route
router.get("/user-details", authMiddleware, getUserDetails);

module.exports = router;
