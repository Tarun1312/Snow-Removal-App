const Booking = require("../models/Booking");
const Subscription = require("../models/Subscription");

// Get all bookings
const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find().populate("userId", "name email");
        res.status(200).json(bookings);
    } catch (error) {
        console.error("Error fetching bookings:", error.message);
        res.status(500).json({ error: "Failed to fetch bookings" });
    }
};

// Delete a booking
const deleteBooking = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBooking = await Booking.findByIdAndDelete(id);
        if (!deletedBooking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        res.status(200).json({ message: "Booking deleted successfully" });
    } catch (error) {
        console.error("Error deleting booking:", error.message);
        res.status(500).json({ error: "Failed to delete booking" });
    }
};

// Get all subscriptions
const getAllSubscriptions = async (req, res) => {
    try {
        const subscriptions = await Subscription.find().populate("userId", "name email");
        res.status(200).json(subscriptions);
    } catch (error) {
        console.error("Error fetching subscriptions:", error.message);
        res.status(500).json({ error: "Failed to fetch subscriptions" });
    }
};

// Cancel a subscription
const cancelSubscription = async (req, res) => {
    const { id } = req.params;
    try {
        const canceledSubscription = await Subscription.findByIdAndDelete(id);
        if (!canceledSubscription) {
            return res.status(404).json({ error: "Subscription not found" });
        }
        res.status(200).json({ message: "Subscription canceled successfully" });
    } catch (error) {
        console.error("Error canceling subscription:", error.message);
        res.status(500).json({ error: "Failed to cancel subscription" });
    }
};

module.exports = { getAllBookings, deleteBooking, getAllSubscriptions, cancelSubscription };
