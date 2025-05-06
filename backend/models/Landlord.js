const mongoose = require("mongoose");

const LandlordSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    isDeleted: { type: Boolean, default: false },
},
    { timestamps: true }
);

module.exports = mongoose.model("Landlord", LandlordSchema);
