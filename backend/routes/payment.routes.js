const PaymentController = require("../controller/payment.controller");
const router = require("express").Router()

router
    .post('/add-payment', PaymentController.AddPayment)
    .get('/get-monthly-payment', PaymentController.getMonthlyCollectedRent)
    .get('/get-pending-payment', PaymentController.getPendingPayments)
    .get('/get-payment-details/:paymentId', PaymentController.getPaymentById)
    .put('/update-payment/:paymentId', PaymentController.UpdatePayment)
    .delete('/soft-delete-payment/:paymentId', PaymentController.SoftDeletePayment)

module.exports = router                                                             