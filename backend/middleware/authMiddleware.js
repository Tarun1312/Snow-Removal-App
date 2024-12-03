const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1]; // Extract token from the Authorization header
    if (!token) {
        return res.status(401).json({ error: "Unauthorized!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
        req.user = decoded; // Attach user information to the request
        next();
    } catch (error) {
        console.error("Invalid token:", error.message);
        res.status(403).json({ error: "Invalid token!" });
    }
};

module.exports = authMiddleware;
