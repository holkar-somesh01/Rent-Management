const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
    {
        property: { type: mongoose.Types.ObjectId, ref: "Property", required: true },
        tenant: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        landlord: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        message: { type: String, required: true },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"],
            default: "pending"
        },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Booking", BookingSchema);
