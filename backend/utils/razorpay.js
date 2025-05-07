const razorpay = new Razorpay({
    key_id: "rzp_test_8g7frJOzzN5wml",
    key_secret: "TmMcFsowpC7bQCKy5wedym1W"
})
exports.razorpay = asyncHandler(async (req, res) => {

    if (!req.body) {
        return res.status(400).json({ message: "body me nhi aaya" })
    }
    console.log("raz amount", req.body.subtotal);

    const options = { amount: req.body.subtotal * 100, receipt: req.body.receipt, currency: req.body.currency }
    // console.log(req.body.subtotal);

    const order = await razorpay.orders.create(options)
    res.json({ message: "initiate ", result: order })
});