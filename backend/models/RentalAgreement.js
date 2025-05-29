const mongoose = require("mongoose")

const rentalAgreementSchema = new mongoose.Schema(
    {
        landlord: { type: mongoose.Types.ObjectId, ref: "Landlord", required: true },
        tenant: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        property: { type: mongoose.Types.ObjectId, ref: "Property", required: true },
        startDate: { type: Date, required: true },
        endDate: { type: Date, required: true },
        monthlyRent: { type: Number, required: true },
        contractRenewalDate: { type: Date, required: true },
        status: { type: String, enum: ["active", "expired"], default: "active" },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("RentalAgreement", rentalAgreementSchema)
