const Subscription = require("../models/Subscription");
const User = require("../models/User");

// Get all available plans
const getPlans = async (req, res) => {
    try {
        const plans = [
            { name: "Frost Guard", price: 249.99, details: "Up to 500 sq ft snow removal" },
            { name: "Blizzard Buster", price: 299.99, details: "Up to 1500 sq ft snow removal" },
            { name: "Arctic Shield", price: 329.99, details: "Up to 2000 sq ft snow removal" }
        ];
        res.status(200).json(plans);
    } catch (error) {
        console.error("Error fetching plans:", error);
        res.status(500).json({ error: "Failed to fetch plans" });
    }
};

// Subscribe to a plan
const subscribeToPlan = async (req, res) => {
    const { planName, cardNumber, expiryDate, cvv } = req.body;
    const userId = req.user.id;

    try {
        const selectedPlan = {
            FrostGuard: { name: "Frost Guard", price: 249.99 },
            BlizzardBuster: { name: "Blizzard Buster", price: 299.99 },
            ArcticShield: { name: "Arctic Shield", price: 329.99 }
        }[planName.replace(/\s+/g, '')]; // Match plan by removing spaces

        if (!selectedPlan) {
            return res.status(400).json({ error: "Invalid plan selected" });
        }

        // Save subscription to database
        const subscription = await Subscription.create({
            userId,
            planName: selectedPlan.name,
            price: selectedPlan.price,
            cardDetails: {
                cardNumber,
                expiryDate,
                cvv
            }
        });

        // Optionally update the user's subscription info
        await User.findByIdAndUpdate(userId, { subscription: selectedPlan.name });

        res.status(201).json({ message: "Subscription successful!", subscription });
    } catch (error) {
        console.error("Error subscribing to plan:", error);
        res.status(500).json({ error: "Failed to subscribe to the plan" });
    }
};

module.exports = { getPlans, subscribeToPlan };
