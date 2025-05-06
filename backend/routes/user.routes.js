const router = require('express').Router()
const userController = require('../controller/user.controller')


router
    .get("/get-property", userController.getAllProperties)
    .get("/get-property-details/:id", userController.getPropertyDetails)
    .post('/bookings', userController.createBooking)
    .get('/bookings', userController.getAllBookings)
    .get('/bookings/landlord/:landlordId', userController.getLandlordBookings)
    .get('/bookings/tenant/:tenantId', userController.getTenantBookings)
    .put('/bookings/:bookingId/status', userController.updateBookingStatus)
    .delete('/bookings/:bookingId', userController.deleteBooking)

module.exports = router