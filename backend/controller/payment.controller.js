const expressAsyncHandler = require('express-async-handler')
const { checkEmpty } = require('../utils/checkEmpty')
const Property = require('../models/Property')
const Payment = require('../models/Payment')
const RentedProperty = require('../models/RentedProperty')
const moment = require('moment')


exports.AddPayment = expressAsyncHandler(async (req, res) => {
    const { tenantId, rentedProperty, amount, paymentDate, paymentStatus, paymentMethod, transactionId } = req.body
    const { isError, error } = checkEmpty({ tenantId, amount, paymentDate, paymentStatus, paymentMethod })
    if (isError) {
        return res.status(400).json({ message: "All Fields Required", error })
    }
    const isFound = await RentedProperty.find({ tenantId })
        .populate({
            path: "property",
            model: "Property"
        })
        .populate("tenantId")
        .populate("payments")
    console.log(isFound)
    const result = await Payment.create({ tenantId, propertyId: rentedProperty, amount: isFound[0].rentAmount, amountPaid: amount, paymentDate, paymentStatus, paymentMethod, transactionId })
    res.json({ message: "Payment Added Success", result })
})
exports.UpdatePayment = expressAsyncHandler(async (req, res) => {
    const { paymentId } = req.params
    const { tenantId, rentedProperty, amount, paymentDate, paymentStatus, paymentMethod, transactionId } = req.body;
    const { isError, error } = checkEmpty({ tenantId, amount, paymentDate, paymentStatus, paymentMethod, transactionId });
    if (isError) {
        return res.status(400).json({ message: "All Fields Required", error });
    }
    const payment = await Payment.findById(paymentId);
    if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
    }
    const isFound = await RentedProperty.findOne({ tenantId })
        .populate("property")
        .populate("tenantId")
        .populate("payments");
    payment.tenantId = tenantId;
    payment.propertyId = rentedProperty;
    payment.amount = isFound?.rentAmount || payment.amount;
    payment.amountPaid = amount;
    payment.paymentDate = paymentDate;
    payment.paymentStatus = paymentStatus;
    payment.paymentMethod = paymentMethod;
    payment.transactionId = transactionId;
    const updatedPayment = await payment.save();

    res.json({ message: "Payment Updated Successfully", updatedPayment });
})
exports.SoftDeletePayment = expressAsyncHandler(async (req, res) => {
    const { paymentId } = req.params;
    const payment = await Payment.findById(paymentId)
    if (!payment) {
        return res.status(404).json({ message: "Payment not found" });
    }
    payment.isDeleted = true
    await payment.save()
    res.json({ message: "Payment soft deleted successfully", payment });
});
exports.getPaymentById = expressAsyncHandler(async (req, res) => {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId)
        .populate("tenantId")
        .populate("propertyId")
    if (!payment || payment.isDeleted) {
        return res.status(404).json({ message: "Payment not found" });
    }
    res.json({ message: "Payment fetched successfully", payment });
});
exports.getMonthlyCollectedRent = async (req, res) => {
    try {
        // Get first and last day of the current month
        const startOfMonth = moment().startOf("month").toDate();
        const endOfMonth = moment().endOf("month").toDate();

        const totalCollected = await Payment.aggregate([
            {
                $match: {
                    paymentStatus: "completed",
                    isDeleted: false,
                    paymentDate: { $gte: startOfMonth, $lte: endOfMonth },
                },
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$amountPaid" },
                },
            },
        ]);

        const total = totalCollected[0]?.total || 0;

        res.status(200).json({
            success: true,
            month: moment().format("MMMM YYYY"),
            totalCollectedRent: total,
        });
    } catch (error) {
        console.error("Error fetching monthly collected rent:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
exports.getPendingPayments = async (req, res) => {
    try {
        const pendingPayments = await Payment.find({
            paymentStatus: "pending",
            isDeleted: false
        })
            .populate("tenantId", "name email")  // Optional: adjust fields as per your User model
            .populate("propertyId", "title address");

        res.status(200).json({ success: true, pendingPayments });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
