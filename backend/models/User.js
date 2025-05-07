const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        mobile: { type: String },
        userId: { type: mongoose.Types.ObjectId, ref: "User" },
        documents: { type: [String] },
        property: { type: mongoose.Types.ObjectId, ref: "Property" },
        role: { type: String, enum: ["superAdmin", "manager", "Tenant", "Landlord"], default: "Tenant" },
        payments: { type: [mongoose.Types.ObjectId], ref: "Payment" },
        status: { type: String, enum: ["active", "inactive"], default: "active" },
        isDeleted: { type: Boolean, default: false },
        isPremium: { type: Boolean, default: false },
    },
    { timestamps: true }
)
module.exports = mongoose.model("User", UserSchema)
