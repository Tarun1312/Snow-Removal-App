const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        planName: { type: String, required: true },
        price: { type: Number, required: true },
        cardDetails: {
            cardNumber: { type: String, required: true },
            expiryDate: { type: String, required: true },
            cvv: { type: String, required: true }
        },
        createdAt: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
