const User = require("../models/User");

const adminMiddleware = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id);
        if (user.role !== "admin") {
            return res.status(403).json({ error: "Access denied! Admins only." });
        }
        next();
    } catch (error) {
        console.error("Error verifying admin:", error.message);
        res.status(500).json({ error: "Server error" });
    }
};

module.exports = adminMiddleware;
