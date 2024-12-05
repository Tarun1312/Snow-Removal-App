const mongoose = require("mongoose"); // Import mongoose for database interaction

// Define the schema for subscriptions
const subscriptionSchema = new mongoose.Schema(
    {
        // Reference to the user who owns the subscription
        userId: {
            type: mongoose.Schema.Types.ObjectId, // ObjectId to reference the User model
            ref: "User", // Refers to the User model
            required: true, // This field is mandatory
        },

        // Name of the subscription plan (e.g., Frost Guard)
        planName: {
            type: String, // Data type is a string
            required: true, // This field is mandatory
        },

        // Price of the subscription plan
        price: {
            type: Number, // Data type is a number
            required: true, // This field is mandatory
        },

        // The date when the subscription ends
        subscriptionEndDate: {
            type: Date, // Data type is a date
            required: true, // This field is mandatory
        },

        // Card details used for the subscription payment
        cardDetails: {
            cardNumber: { type: String }, // Last 4 digits of the card number
            expiryDate: { type: String }, // Expiry date in MM/YY format
            cvv: { type: String }, // Masked CVV
        },
    },

    // Add timestamps to track creation and update times
    { timestamps: true }
);

// Middleware to set the subscriptionEndDate before saving
subscriptionSchema.pre("save", function (next) {
    // If subscriptionEndDate is not already set, calculate it
    if (!this.subscriptionEndDate) {
        const currentDate = new Date(); // Get the current date
        this.subscriptionEndDate = new Date(currentDate); // Clone the current date
        this.subscriptionEndDate.setDate(currentDate.getDate() + 30); // Add 30 days for the subscription duration
    }
    next(); // Proceed to save the document
});

// Export the Subscription model based on the schema
module.exports = mongoose.model("Subscription", subscriptionSchema);
