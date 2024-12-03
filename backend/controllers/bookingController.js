const Booking = require("../models/Booking");

// Create a new booking
const createBooking = async (req, res) => {
    const { serviceType, areaSize, additionalNotes, appointmentDate, comments } = req.body;

    try {
        const booking = await Booking.create({
            serviceType,
            areaSize,
            additionalNotes,
            appointmentDate,
            comments,
            userId: req.user.id, // Associate the booking with the logged-in user
        });

        res.status(201).json({ message: "Booking created successfully!", booking });
    } catch (error) {
        console.error("Error creating booking:", error.message);
        res.status(500).json({ error: "Failed to create booking" });
    }
};

// Get user-specific appointments
const getUserAppointments = async (req, res) => {
    try {
        const appointments = await Booking.find({ userId: req.user.id }).sort({ appointmentDate: 1 });
        res.status(200).json({ appointments });
    } catch (error) {
        console.error("Error fetching appointments:", error.message);
        res.status(500).json({ error: "Failed to fetch appointments" });
    }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBooking = await Booking.findOneAndDelete({ _id: id, userId: req.user.id });

        if (!deletedBooking) {
            return res.status(404).json({ error: "Booking not found or not authorized to delete" });
        }

        res.status(200).json({ message: "Booking deleted successfully!" });
    } catch (error) {
        console.error("Error deleting appointment:", error.message);
        res.status(500).json({ error: "Failed to delete appointment" });
    }
};

module.exports = { createBooking, getUserAppointments, deleteAppointment };
