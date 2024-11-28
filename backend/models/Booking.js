const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        serviceType: { type: String, required: true },
        date: { type: Date, required: true },
    },
    { timestamps: true }
);

const Booking = mongoose.model("Booking", bookingSchema);
module.exports = Booking;
 