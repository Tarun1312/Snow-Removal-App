const Booking = require("../models/Booking");

// Create a new booking
const createBooking = async (req, res) => {
    const { serviceType, areaSize, additionalNotes, appointmentDate, comments } = req.body;

    try {
        // Validate required fields
        if (!serviceType || !areaSize || !appointmentDate) {
            return res.status(400).json({ error: "Service type, area size, and appointment date are required." });
        }

        // Create the booking
        const booking = await Booking.create({
            serviceType,
            areaSize,
            additionalNotes: additionalNotes || "",
            appointmentDate,
            comments: comments || "",
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
        if (appointments.length === 0) {
            return res.status(404).json({ message: "No appointments found." });
        }
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
            return res.status(404).json({ error: "Booking not found or not authorized to delete." });
        }

        res.status(200).json({ message: "Booking deleted successfully!", deletedBooking });
    } catch (error) {
        console.error("Error deleting appointment:", error.message);
        res.status(500).json({ error: "Failed to delete appointment" });
    }
};

module.exports = { createBooking, getUserAppointments, deleteAppointment };
