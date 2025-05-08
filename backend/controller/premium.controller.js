const Razorpay = require("razorpay");
const crypto = require("crypto");
const Premium = require("../models/Premium");
const User = require("../models/User");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// 1. Create order
exports.createPremiumOrder = async (req, res) => {
    try {
        const { planType } = req.body;
        const userId = req.user._id;

        // Check if the user already has an active premium plan
        const existingPremium = await Premium.findOne({ userId, paymentStatus: "Success" });
        if (existingPremium) {
            return res.status(400).json({ message: "You already have an active premium plan." });
        }

        const plans = {
            Monthly: 49900, // in paisa (₹499.00)
            Yearly: 499900, // in paisa (₹4999.00)
        };

        const amount = plans[planType];

        if (!amount) {
            return res.status(400).json({ message: "Invalid plan type" });
        }

        const options = {
            amount,
            currency: "INR",
            receipt: `premium_rcpt_${Date.now()}`,
        };

        const order = await razorpay.orders.create(options);

        return res.status(200).json({
            success: true,
            orderId: order.id,
            amount: order.amount,
            currency: order.currency,
        });
    } catch (error) {
        console.error("Error creating Razorpay order:", error);
        res.status(500).json({ message: "Failed to create order" });
    }
};

// 2. Verify and save payment
exports.verifyPremiumPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            planType,
            paymentMethod,
        } = req.body;
        const userId = req.user._id;

        const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
        hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
        const generatedSignature = hmac.digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ message: "Payment verification failed" });
        }

        const price = planType === "Monthly" ? 499 : 4999;
        const startDate = new Date();
        const endDate = new Date(
            planType === "Monthly"
                ? startDate.setMonth(startDate.getMonth() + 1)
                : startDate.setFullYear(startDate.getFullYear() + 1)
        );

        // Save the premium data after payment verification
        const premium = new Premium({
            userId,
            planType,
            price,
            paymentStatus: "Success",
            paymentMethod,
            transactionId: razorpay_payment_id,
            startDate: new Date(),
            endDate,
        });

        await premium.save();

        res.status(201).json({ success: true, message: "Premium activated" });
    } catch (error) {
        console.error("Payment verification error:", error);
        res.status(500).json({ message: "Payment verification failed" });
    }
};
