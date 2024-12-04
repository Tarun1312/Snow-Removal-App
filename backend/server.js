const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON body
app.use(cors()); // Enable CORS

// Test API availability
app.get("/", (req, res) => {
    res.status(200).json({ message: "API is running..." });
});

// Routes
app.use("/api/auth", require("./routes/authRoutes")); // Authentication routes
app.use("/api/bookings", require("./routes/bookingRoutes")); // Booking routes
app.use("/api/subscriptions", require("./routes/subscriptionRoutes")); // Subscription routes
app.use("/api/admin", require("./routes/adminRoutes")); // Admin routes

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
