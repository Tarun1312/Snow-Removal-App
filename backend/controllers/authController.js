// Import necessary modules
const bcrypt = require("bcrypt"); // For password hashing
const jwt = require("jsonwebtoken"); // For generating JSON Web Tokens
const User = require("../models/User"); // User model for database interaction
const Booking = require("../models/Booking"); // Booking model for fetching user bookings

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body; // Extract user data from the request body
    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists!" }); // Send error if user exists
        }

        // Hash the user's password for secure storage
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user in the database
        const user = await User.create({
            name,
            email,
            password: hashedPassword, // Store hashed password
        });

        // Respond with success and user details
        res.status(201).json({ message: "User registered successfully!", user });
    } catch (error) {
        console.error("Error in registerUser:", error.message); // Log the error for debugging
        res.status(500).json({ error: "User registration failed!" }); // Respond with a server error
    }
};

// Login a user
const loginUser = async (req, res) => {
    const { email, password } = req.body; // Extract login credentials from the request body
    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found!" }); // Send error if user doesn't exist

        // Compare the provided password with the stored hashed password
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) return res.status(400).json({ error: "Invalid credentials!" }); // Invalid password

        // Generate a JWT for authentication
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        // Respond with the token and user details
        res.status(200).json({
            message: "Login successful!",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role, // Provide user role for role-based access
            },
        });
    } catch (error) {
        console.error("Error in loginUser:", error.message); // Log the error for debugging
        res.status(500).json({ error: "Login failed!" }); // Respond with a server error
    }
};

// Get user details
const getUserDetails = async (req, res) => {
    try {
        // Fetch the user details by ID, excluding the password field
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" }); // Send error if user doesn't exist
        }

        // Fetch the user's appointments from the Booking model
        const appointments = await Booking.find({ userId: req.user.id });

        // Respond with the user's details and their appointments
        res.status(200).json({
            user: {
                name: user.name,
                email: user.email,
                appointments, // Include user's appointments
            },
        });
    } catch (error) {
        console.error("Error fetching user details:", error.message); // Log the error for debugging
        res.status(500).json({ error: "Server error" }); // Respond with a server error
    }
};

// Reset user's password
const forgotPassword = async (req, res) => {
    const { email, newPassword } = req.body; // Extract email and new password from the request body

    try {
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found!" }); // Send error if user doesn't exist
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        user.password = hashedPassword;
        await user.save(); // Save changes to the database

        // Respond with success message
        res.status(200).json({ message: "Password reset successful!" });
    } catch (error) {
        console.error("Error in forgotPassword:", error.message); // Log the error for debugging
        res.status(500).json({ error: "Failed to reset password!" }); // Respond with a server error
    }
};

// Export the functions for use in the routes
module.exports = { registerUser, loginUser, getUserDetails, forgotPassword };
