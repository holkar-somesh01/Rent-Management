const Razorpay = require("razorpay");
const crypto = require("crypto");
const Premium = require("../models/Premium");
const User = require("../models/User");
const expressAsyncHandler = require("express-async-handler");

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// // 1. Create order
// exports.createPremiumOrder = async (req, res) => {
//     try {
//         const { planType } = req.body;
//         const userId = req.user._id;

//         // Check if the user already has an active premium plan
//         const existingPremium = await Premium.findOne({ userId, paymentStatus: "Success" });
//         if (existingPremium) {
//             return res.status(400).json({ message: "You already have an active premium plan." });
//         }

//         const plans = {
//             Monthly: 49900, // in paisa (₹499.00)
//             Yearly: 499900, // in paisa (₹4999.00)
//         };

//         const amount = plans[planType];

//         if (!amount) {
//             return res.status(400).json({ message: "Invalid plan type" });
//         }

//         const options = {
//             amount,
//             currency: "INR",
//             receipt: `premium_rcpt_${Date.now()}`,
//         };

//         const order = await razorpay.orders.create(options);

//         return res.status(200).json({
//             success: true,
//             orderId: order.id,
//             amount: order.amount,
//             currency: order.currency,
//         });
//     } catch (error) {
//         console.error("Error creating Razorpay order:", error);
//         res.status(500).json({ message: "Failed to create order" });
//     }
// }
// exports.verifyPremiumPayment = async (req, res) => {
//     try {
//         const {
//             razorpay_order_id,
//             razorpay_payment_id,
//             razorpay_signature,
//             planType,
//         } = req.body;

//         const userId = req.user; // assuming middleware sets this
//         if (!userId) {
//             return res.status(401).json({ success: false, message: "User not authenticated" });
//         }

//         // Step 1: Verify Signature
//         const generatedSignature = crypto
//             .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//             .update(`${razorpay_order_id}|${razorpay_payment_id}`)
//             .digest("hex");

//         if (generatedSignature !== razorpay_signature) {
//             return res.status(400).json({ success: false, message: "Payment verification failed" });
//         }

//         // Step 2: Get actual payment details from Razorpay
//         const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
//         const method = paymentDetails.method; // 'upi', 'card', 'wallet', etc.

//         // Step 3: Calculate plan duration
//         const price = planType === "Monthly" ? 499 : 4999;       // get this payment from frontend and Dynamically
//         const startDate = new Date();
//         const endDate = new Date(planType === "Monthly"
//             ? new Date(startDate).setMonth(startDate.getMonth() + 1)
//             : new Date(startDate).setFullYear(startDate.getFullYear() + 1)
//         );

//         // Step 4: Save Premium record in MongoDB
//         const premium = new Premium({
//             userId,
//             planType,
//             price,
//             paymentStatus: "Success",
//             paymentMethod: method,
//             transactionId: razorpay_payment_id,
//             startDate: new Date(),
//             endDate,
//         });

//         await premium.save();

//         return res.status(201).json({
//             success: true,
//             message: "Premium activated",
//             paymentMethod: method,
//         });

//     } catch (error) {
//         console.error("Payment verification error:", error);
//         return res.status(500).json({
//             success: false,
//             message: "Server error during payment verification",
//         });
//     }
// }

exports.GetPremiumUser = expressAsyncHandler(async (req, res) => {
    const userId = req.user
    const result = await Premium.find().populate('userId')
    res.json({ message: "Premium User Fetched", result })
})
exports.LandlordPremiumDetails = expressAsyncHandler(async (req, res) => {
    const userId = req.user
    const result = await Premium.find({ userId }).populate('userId')
    res.json({ message: "Landlord Premium Details Fetched", result })
})

exports.createPremiumOrder = async (req, res) => {
    try {
        const { planType, price } = req.body
        const userId = req.user
        const existingPremium = await Premium.findOne({ userId, paymentStatus: "Success" });
        if (existingPremium) {
            return res.status(400).json({ message: "You already have an active premium plan." });
        }
        const plans = {
            Monthly: 49900,
            Yearly: 499900,
        };

        // Validate the dynamic price (should match the expected amount for the plan)
        const expectedPrice = plans[planType];

        if (!expectedPrice || expectedPrice !== price) {
            return res.status(400).json({ message: "Invalid price for selected plan" });
        }

        const options = {
            amount: price, // Use dynamic price from frontend (already in paisa)
            currency: "INR",
            receipt: `premium_rcpt_${Date.now()}`,
        };

        // Create Razorpay order
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

exports.verifyPremiumPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            planType,
            price,
        } = req.body;

        const userId = req.user
        if (!userId) {
            return res.status(401).json({ success: false, message: "User not authenticated" });
        }

        // Step 1: Verify Signature
        const generatedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generatedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Payment verification failed" });
        }

        // Step 2: Get actual payment details from Razorpay
        const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
        const method = paymentDetails.method; // 'upi', 'card', 'wallet', etc.

        // Step 3: Calculate plan duration
        const startDate = new Date();
        const endDate = new Date(planType === "Monthly"
            ? new Date(startDate).setMonth(startDate.getMonth() + 1)
            : new Date(startDate).setFullYear(startDate.getFullYear() + 1)
        );

        // Step 4: Save Premium record in MongoDB
        const premium = new Premium({
            userId,
            planType,
            price,
            paymentStatus: "Success",
            paymentMethod: method,
            transactionId: razorpay_payment_id,
            startDate,
            endDate,
        });

        await premium.save();

        return res.status(201).json({
            success: true,
            message: "Premium activated",
            paymentMethod: method,
        });

    } catch (error) {
        console.error("Payment verification error:", error)
        return res.status(500).json({
            success: false,
            message: "Server error during payment verification",
        })
    }
}