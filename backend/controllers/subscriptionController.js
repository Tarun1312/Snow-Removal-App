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
        console.error("Error fetching plans:", error.message);
        res.status(500).json({ error: "Failed to fetch plans" });
    }
};

// Subscribe to a plan
const subscribeToPlan = async (req, res) => {
    const { planName, cardNumber, expiryDate, cvv } = req.body;
    const userId = req.user.id;

    try {
        // Predefined plans
        const availablePlans = {
            "Frost Guard": { name: "Frost Guard", price: 249.99 },
            "Blizzard Buster": { name: "Blizzard Buster", price: 299.99 },
            "Arctic Shield": { name: "Arctic Shield", price: 329.99 }
        };

        // Validate the selected plan
        const selectedPlan = availablePlans[planName];
        if (!selectedPlan) {
            return res.status(400).json({ error: "Invalid plan selected" });
        }

        // Calculate subscription end date (30 days from the current date)
        const currentDate = new Date();
        const subscriptionEndDate = new Date(currentDate);
        subscriptionEndDate.setDate(currentDate.getDate() + 30);

        // Save the subscription
        const subscription = await Subscription.create({
            userId,
            planName: selectedPlan.name,
            price: selectedPlan.price,
            subscriptionEndDate,
            cardDetails: {
                cardNumber: cardNumber.slice(-4), // Save only the last 4 digits
                expiryDate,
                cvv: "***" // Mask CVV for security
            }
        });

        // Update the user's subscription info
        await User.findByIdAndUpdate(userId, { subscription: selectedPlan.name });

        res.status(201).json({
            message: "Subscription successful!",
            subscription: {
                planName: subscription.planName,
                price: subscription.price,
                subscriptionEndDate: subscription.subscriptionEndDate
            }
        });
    } catch (error) {
        console.error("Error subscribing to plan:", error.message);
        res.status(500).json({ error: "Failed to subscribe to the plan" });
    }
};

// Get subscription details
const getSubscriptionDetails = async (req, res) => {
    try {
        // Fetch the latest subscription for the logged-in user
        const subscription = await Subscription.findOne({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .populate("userId", "name");

        if (!subscription) {
            return res.status(404).json({ error: "No subscription found for this user" });
        }

        // Include the subscription end date in the response
        res.status(200).json({
            userName: subscription.userId.name,
            planName: subscription.planName,
            price: subscription.price,
            subscriptionEndDate: subscription.subscriptionEndDate.toISOString(), // Ensure it's sent as a string
        });
    } catch (error) {
        console.error("Error fetching subscription details:", error.message);
        res.status(500).json({ error: "Failed to fetch subscription details" });
    }
};

module.exports = { getPlans, subscribeToPlan, getSubscriptionDetails };
