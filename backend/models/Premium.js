const mongoose = require('mongoose');

const PremiumSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    planType: {
        type: String,
        enum: ['Monthly', 'Yearly'],
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    paymentStatus: {
        type: String,
        enum: ['Success', 'Pending', 'Failed'],
        default: 'Pending',
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    paymentMethod: {
        type: String,
        enum: ['UPI', 'Card', 'NetBanking', 'Wallet'],
        required: true,
    },
    transactionId: {
        type: String,
        required: true,
        unique: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Premium', PremiumSchema);
