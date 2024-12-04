const Booking = require("../models/Booking");
const Subscription = require("../models/Subscription");
const User = require("../models/User");

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
        res.status(200).json({ message: "Booking deleted successfully!" });
    } catch (error) {
        console.error("Error deleting booking:", error.message);
        res.status(500).json({ error: "Failed to delete booking" });
    }
};

// Update a booking
const updateBooking = async (req, res) => {
    const { id } = req.params;
    const { serviceType, areaSize, appointmentDate, comments } = req.body;
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            id,
            { serviceType, areaSize, appointmentDate, comments },
            { new: true }
        );
        if (!updatedBooking) {
            return res.status(404).json({ error: "Booking not found" });
        }
        res.status(200).json(updatedBooking);
    } catch (error) {
        console.error("Error updating booking:", error.message);
        res.status(500).json({ error: "Failed to update booking" });
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

// Update subscription plan details
const updateSubscriptionPlan = async (req, res) => {
    const { planId } = req.params;
    const { name, price, details } = req.body;
    try {
        const updatedPlan = await Subscription.findByIdAndUpdate(
            planId,
            { name, price, details },
            { new: true }
        );
        if (!updatedPlan) {
            return res.status(404).json({ error: "Subscription plan not found" });
        }
        res.status(200).json(updatedPlan);
    } catch (error) {
        console.error("Error updating subscription plan:", error.message);
        res.status(500).json({ error: "Failed to update subscription plan" });
    }
};

module.exports = {
    getAllBookings,
    deleteBooking,
    updateBooking,
    getAllSubscriptions,
    updateSubscriptionPlan,
};
