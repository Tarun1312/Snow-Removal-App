const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        serviceType: { type: String, required: true },
        areaSize: { type: String, required: true },
        additionalNotes: { type: String },
        appointmentDate: { type: Date, required: true },
        comments: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
