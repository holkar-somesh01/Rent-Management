const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
    {
        tenantId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        propertyId: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
        amount: { type: Number, required: true },
        amountPaid: { type: Number, required: true },
        paymentDate: { type: Date, default: Date.now },
        paymentStatus: { type: String, enum: ["pending", "completed"], default: "pending" },
        paymentMethod: { type: String, enum: ["cash", "bank transfer", "online"], required: true },
        transactionId: { type: String },
        isDeleted: { type: Boolean, default: false },
    },
    { timestamps: true }
)

module.exports = mongoose.model("Payment", PaymentSchema)
