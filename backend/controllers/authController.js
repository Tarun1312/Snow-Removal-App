const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Booking = require("../models/Booking");

// Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({ message: "User registered successfully!", user });
    } catch (error) {
        console.error("Error in registerUser:", error.message);
        res.status(500).json({ error: "User registration failed!" });
    }
};

// Login user
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "User not found!" });

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) return res.status(400).json({ error: "Invalid credentials!" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            message: "Login successful!",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role, 
            },
        });
    } catch (error) {
        console.error("Error in loginUser:", error.message);
        res.status(500).json({ error: "Login failed!" });
    }
};

// Get user details
const getUserDetails = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const appointments = await Booking.find({ userId: req.user.id });

        res.status(200).json({
            user: {
                name: user.name,
                email: user.email,
                appointments,
            },
        });
    } catch (error) {
        console.error("Error fetching user details:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Forgot Password
const forgotPassword = async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: "User not found!" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password reset successful!" });
    } catch (error) {
        console.error("Error in forgotPassword:", error.message);
        res.status(500).json({ error: "Failed to reset password!" });
    }
};

module.exports = { registerUser, loginUser, getUserDetails, forgotPassword };
