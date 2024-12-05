const User = require("../models/User"); // Import the User model for database operations

// Middleware to verify if the logged-in user is an admin
const adminMiddleware = async (req, res, next) => {
    try {
        // Fetch the user details from the database using the ID from the authenticated request
        const user = await User.findById(req.user.id);

        // Check if the user's role is not "admin"
        if (user.role !== "admin") {
            // Return a 403 Forbidden response if the user is not an admin
            return res.status(403).json({ error: "Access denied! Admins only." });
        }

        // If the user is an admin, proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Log the error and return a 500 Internal Server Error response if something goes wrong
        console.error("Error verifying admin:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

// Export the middleware to be used in protected admin routes
module.exports = adminMiddleware;
