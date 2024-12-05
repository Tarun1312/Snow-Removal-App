const mongoose = require("mongoose"); // Import mongoose for database interaction

// Define the schema for user data
const userSchema = new mongoose.Schema(
    {
        // User's full name
        name: {
            type: String, // Data type is a string
            required: true, // This field is mandatory
        },

        // User's email address
        email: {
            type: String, // Data type is a string
            required: true, // This field is mandatory
            unique: true, // Ensures email addresses are unique in the database
        },

        // Hashed password for authentication
        password: {
            type: String, // Data type is a string
            required: true, // This field is mandatory
        },

        // Role to determine user's permissions (e.g., "user" or "admin")
        role: {
            type: String, // Data type is a string
            enum: ["user", "admin"], // Allowed values: "user" or "admin"
            default: "user", // Default role is "user"
        },
    },

    // Add timestamps to track creation and update times
    { timestamps: true }
);

// Export the User model based on the schema
module.exports = mongoose.model("User", userSchema);
