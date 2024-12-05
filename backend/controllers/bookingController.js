const Booking = require("../models/Booking"); // Import the Booking model for interacting with the database

// Create a new booking
const createBooking = async (req, res) => {
    // Extract relevant fields from the request body
    const { serviceType, areaSize, additionalNotes, appointmentDate, comments } = req.body;

    try {
        // Validate required fields: Ensure the service type, area size, and appointment date are provided
        if (!serviceType || !areaSize || !appointmentDate) {
            return res.status(400).json({ error: "Service type, area size, and appointment date are required." });
        }

        // Create a new booking document in the database
        const booking = await Booking.create({
            serviceType, // The type of service requested by the user
            areaSize, // The size of the area for the service
            additionalNotes: additionalNotes || "", // Optional additional notes from the user
            appointmentDate, // The date of the appointment
            comments: comments || "", // Optional comments from the user
            userId: req.user.id, // Associate the booking with the currently logged-in user
        });

        // Respond with a success message and the created booking details
        res.status(201).json({ message: "Booking created successfully!", booking });
    } catch (error) {
        // Log any errors and respond with an error message
        console.error("Error creating booking:", error.message);
        res.status(500).json({ error: "Failed to create booking" });
    }
};

// Get appointments specific to the logged-in user
const getUserAppointments = async (req, res) => {
    try {
        // Fetch appointments for the logged-in user, sorted by appointment date in ascending order
        const appointments = await Booking.find({ userId: req.user.id }).sort({ appointmentDate: 1 });

        // Check if there are no appointments and respond accordingly
        if (appointments.length === 0) {
            return res.status(404).json({ message: "No appointments found." });
        }

        // Respond with the list of appointments
        res.status(200).json({ appointments });
    } catch (error) {
        // Log any errors and respond with an error message
        console.error("Error fetching appointments:", error.message);
        res.status(500).json({ error: "Failed to fetch appointments" });
    }
};

// Delete an appointment
const deleteAppointment = async (req, res) => {
    const { id } = req.params; // Extract the appointment ID from the request parameters

    try {
        // Find and delete the appointment matching the ID and user ID (to ensure authorization)
        const deletedBooking = await Booking.findOneAndDelete({ _id: id, userId: req.user.id });

        // Check if the booking exists and was successfully deleted
        if (!deletedBooking) {
            return res.status(404).json({ error: "Booking not found or not authorized to delete." });
        }

        // Respond with a success message and the deleted booking details
        res.status(200).json({ message: "Booking deleted successfully!", deletedBooking });
    } catch (error) {
        // Log any errors and respond with an error message
        console.error("Error deleting appointment:", error.message);
        res.status(500).json({ error: "Failed to delete appointment" });
    }
};

// Export the functions to be used in route handling
module.exports = { createBooking, getUserAppointments, deleteAppointment };
