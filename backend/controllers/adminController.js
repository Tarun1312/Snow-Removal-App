const Booking = require("../models/Booking"); // Import the Booking model for interacting with booking data
const Subscription = require("../models/Subscription"); // Import the Subscription model for interacting with subscription data

// Get all bookings
const getAllBookings = async (req, res) => {
    try {
        // Fetch all bookings from the database and populate the user details (name and email) for each booking
        const bookings = await Booking.find().populate("userId", "name email");
        res.status(200).json(bookings); // Send the bookings as a JSON response with a 200 status code
    } catch (error) {
        console.error("Error fetching bookings:", error.message); // Log the error for debugging
        res.status(500).json({ error: "Failed to fetch bookings" }); // Send a 500 status code with an error message
    }
};

// Delete a booking by ID
const deleteBooking = async (req, res) => {
    const { id } = req.params; // Extract the booking ID from the request parameters
    try {
        // Find the booking by ID and delete it from the database
        const deletedBooking = await Booking.findByIdAndDelete(id);
        if (!deletedBooking) {
            return res.status(404).json({ error: "Booking not found" }); // Return a 404 error if the booking does not exist
        }
        res.status(200).json({ message: "Booking deleted successfully" }); // Send a success message with a 200 status code
    } catch (error) {
        console.error("Error deleting booking:", error.message); // Log the error for debugging
        res.status(500).json({ error: "Failed to delete booking" }); // Send a 500 status code with an error message
    }
};

// Get all subscriptions
const getAllSubscriptions = async (req, res) => {
    try {
        // Fetch all subscriptions from the database and populate the user details (name and email) for each subscription
        const subscriptions = await Subscription.find().populate("userId", "name email");
        res.status(200).json(subscriptions); // Send the subscriptions as a JSON response with a 200 status code
    } catch (error) {
        console.error("Error fetching subscriptions:", error.message); // Log the error for debugging
        res.status(500).json({ error: "Failed to fetch subscriptions" }); // Send a 500 status code with an error message
    }
};

// Cancel a subscription by ID
const cancelSubscription = async (req, res) => {
    const { id } = req.params; // Extract the subscription ID from the request parameters
    try {
        // Find the subscription by ID and delete it from the database
        const canceledSubscription = await Subscription.findByIdAndDelete(id);
        if (!canceledSubscription) {
            return res.status(404).json({ error: "Subscription not found" }); // Return a 404 error if the subscription does not exist
        }
        res.status(200).json({ message: "Subscription canceled successfully" }); // Send a success message with a 200 status code
    } catch (error) {
        console.error("Error canceling subscription:", error.message); // Log the error for debugging
        res.status(500).json({ error: "Failed to cancel subscription" }); // Send a 500 status code with an error message
    }
};

// Export the functions to be used in the routes
module.exports = { getAllBookings, deleteBooking, getAllSubscriptions, cancelSubscription };
