const mongoose = require("mongoose")

const PropertySchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        type: { type: String, enum: ["residential", "commercial"], required: true },
        location: { type: String, required: true },
        size: { type: String, required: true },
        rentPrice: { type: Number, required: true },
        documents: { type: [String] },
        images: { type: [String] }, //["633643.png","73834.png","89573495.png"]
        landlord: { type: mongoose.Types.ObjectId, ref: "User", required: true },
        isRented: { type: Boolean, default: false },
        isDeleted: { type: Boolean, default: false },
    }, { timestamps: true })
module.exports = mongoose.model("Property", PropertySchema)