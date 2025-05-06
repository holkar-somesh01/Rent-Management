const mongoose = require("mongoose");

const RentedPropertySchema = new mongoose.Schema(
    {
        property: { type: mongoose.Types.ObjectId, ref: "Property", required: true },
        tenantId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        rentAmount: { type: Number, required: true },
        leaseStart: { type: Date, required: true },
        leaseEnd: { type: Date },
        payments: { type: [mongoose.Types.ObjectId], ref: "Payment" },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model("RentedProperty", RentedPropertySchema);
