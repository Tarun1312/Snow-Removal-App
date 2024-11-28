const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
    const { serviceType, date, user } = req.body;

    try {
        const booking = await Booking.create({ serviceType, date, user });
        res.status(201).json(booking);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createBooking };
