// const mongoose = require("mongoose");

// const CommercialPropertySchema = new mongoose.Schema(
//     {
//         property: { type: mongoose.Types.ObjectId, ref: "Property", required: true },
//         tenant: { type: mongoose.Types.ObjectId, ref: "User", required: true },
//         businessName: { type: String, required: true }, // XYZ Company
//         businessType: { type: String, required: true }, // Retail Shop, IT Company, Restaurant
//         leaseStart: { type: Date, required: true },     // start date of the lease agreement
//         leaseEnd: { type: Date, required: true },       // end date of the lease agreement
//         isDeleted: { type: Boolean, default: false },
//     },
//     { timestamps: true }
// );

// module.exports = mongoose.model("CommercialProperty", CommercialPropertySchema);