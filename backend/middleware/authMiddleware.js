const jwt = require("jsonwebtoken"); // Import the JSON Web Token (JWT) library

// Middleware to authenticate the user using a JWT token
const authMiddleware = (req, res, next) => {
    // Extract the token from the Authorization header, which is in the format "Bearer <token>"
    const token = req.headers.authorization?.split(" ")[1]; 

    // If no token is provided, return a 401 Unauthorized error
    if (!token) {
        return res.status(401).json({ error: "Unauthorized!" });
    }

    try {
        // Verify the token using the secret key stored in the environment variable
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Attach the decoded token payload (user data) to the `req` object for use in subsequent middleware or route handlers
        req.user = decoded;

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // If token verification fails, log the error and return a 403 Forbidden error
        console.error("Invalid token:", error.message);
        res.status(403).json({ error: "Invalid token!" });
    }
};

module.exports = authMiddleware; // Export the middleware to use it in protected routes
