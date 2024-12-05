const Subscription = require("../models/Subscription"); // Import the Subscription model for managing subscription data
const User = require("../models/User"); // Import the User model for user-related operations

// Function to retrieve all available subscription plans
const getPlans = async (req, res) => {
    try {
        // Define predefined subscription plans
        const plans = [
            { name: "Frost Guard", price: 249.99, details: "Up to 500 sq ft snow removal" },
            { name: "Blizzard Buster", price: 299.99, details: "Up to 1500 sq ft snow removal" },
            { name: "Arctic Shield", price: 329.99, details: "Up to 2000 sq ft snow removal" }
        ];

        // Return the plans to the client
        res.status(200).json(plans);
    } catch (error) {
        // Log and return an error if fetching plans fails
        console.error("Error fetching plans:", error.message);
        res.status(500).json({ error: "Failed to fetch plans" });
    }
};

// Function to handle subscription to a plan
const subscribeToPlan = async (req, res) => {
    const { planName, cardNumber, expiryDate, cvv } = req.body; // Extract subscription details from the request body
    const userId = req.user.id; // Get the logged-in user's ID from the request object

    try {
        // Define predefined subscription plans
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

        // Calculate the subscription end date (30 days from the current date)
        const currentDate = new Date();
        const subscriptionEndDate = new Date(currentDate);
        subscriptionEndDate.setDate(currentDate.getDate() + 30);

        // Save the subscription in the database
        const subscription = await Subscription.create({
            userId, // Associate the subscription with the logged-in user
            planName: selectedPlan.name,
            price: selectedPlan.price,
            subscriptionEndDate, // Store the calculated end date
            cardDetails: {
                cardNumber: cardNumber.slice(-4), // Save only the last 4 digits of the card number
                expiryDate,
                cvv: "***" // Mask CVV for security
            }
        });

        // Update the user's subscription information in the User model
        await User.findByIdAndUpdate(userId, { subscription: selectedPlan.name });

        // Return success response with subscription details
        res.status(201).json({
            message: "Subscription successful!",
            subscription: {
                planName: subscription.planName,
                price: subscription.price,
                subscriptionEndDate: subscription.subscriptionEndDate
            }
        });
    } catch (error) {
        // Log and return an error if the subscription fails
        console.error("Error subscribing to plan:", error.message);
        res.status(500).json({ error: "Failed to subscribe to the plan" });
    }
};

// Function to retrieve subscription details for the logged-in user
const getSubscriptionDetails = async (req, res) => {
    try {
        // Find the latest subscription for the logged-in user, sorted by creation date
        const subscription = await Subscription.findOne({ userId: req.user.id })
            .sort({ createdAt: -1 })
            .populate("userId", "name"); // Populate user information to include the user's name

        // If no subscription is found, return an error response
        if (!subscription) {
            return res.status(404).json({ error: "No subscription found for this user" });
        }

        // Return the subscription details, including the subscription end date
        res.status(200).json({
            userName: subscription.userId.name,
            planName: subscription.planName,
            price: subscription.price,
            subscriptionEndDate: subscription.subscriptionEndDate.toISOString() // Ensure the date is sent as a string
        });
    } catch (error) {
        // Log and return an error if fetching subscription details fails
        console.error("Error fetching subscription details:", error.message);
        res.status(500).json({ error: "Failed to fetch subscription details" });
    }
};

// Export the functions for use in routes
module.exports = { getPlans, subscribeToPlan, getSubscriptionDetails };
