const mongoose = require("mongoose"); // Import mongoose

const subscriptionSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        planName: { type: String, required: true },
        price: { type: Number, required: true },
        subscriptionEndDate: { type: Date, required: true }, // Ensure this field exists
        cardDetails: {
            cardNumber: { type: String },
            expiryDate: { type: String },
            cvv: { type: String },
        },
    },
    { timestamps: true }
);

// Automatically set subscriptionEndDate before saving
subscriptionSchema.pre("save", function (next) {
    // Calculate subscriptionEndDate if not already set
    if (!this.subscriptionEndDate) {
        const currentDate = new Date();
        this.subscriptionEndDate = new Date(currentDate);
        this.subscriptionEndDate.setDate(currentDate.getDate() + 30); // Add 30 days
    }
    next();
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
