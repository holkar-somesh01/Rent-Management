const expressAsyncHandler = require('express-async-handler')
const Property = require('../models/Property')
const Booking = require('../models/Booking')


exports.getAllProperties = expressAsyncHandler(async (req, res) => {
    const result = await Property.find().populate("landlord")
    res.json({ message: "Property Fetch Success", result })
})
exports.getPropertyDetails = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await Property.findById(id).populate("landlord")
    res.json({ message: "Property Details Fetch Success", result })
})
exports.createBooking = expressAsyncHandler(async (req, res) => {
    const { property, tenant, landlord, message } = req.body;

    const newBooking = new Booking({ property, tenant, landlord, message });
    await newBooking.save();
    res.status(201).json({ message: "Booking request sent successfully", newBooking });
})
exports.getAllBookings = expressAsyncHandler(async (req, res) => {
    const bookings = await Booking.find({ isDeleted: false })
        .populate("property", "name type location")
        .populate("tenant", "name email")
        .populate("landlord", "name email")
        .sort({ createdAt: -1 })

    res.status(200).json(bookings)
})
exports.getLandlordBookings = expressAsyncHandler(async (req, res) => {
    const { landlordId } = req.params

    const bookings = await Booking.find({ landlord: landlordId, isDeleted: false })
        .populate("property", "name type location")
        .populate("tenant", "name email")
        .sort({ createdAt: -1 });

    res.status(200).json(bookings)
})
exports.getTenantBookings = expressAsyncHandler(async (req, res) => {
    const { tenantId } = req.params

    const bookings = await Booking.find({ tenant: tenantId, isDeleted: false })
        .populate("property", "name type location")
        .populate("landlord", "name email")
        .sort({ createdAt: -1 });

    res.status(200).json(bookings)
})
exports.updateBookingStatus = expressAsyncHandler(async (req, res) => {
    const { bookingId } = req.params;
    const { status } = req.body;

    if (!["pending", "accepted", "rejected"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        { status },
        { new: true }
    );

    if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found" })
    }

    res.status(200).json({ message: "Booking status updated", updatedBooking })
})
exports.deleteBooking = expressAsyncHandler(async (req, res) => {
    const { bookingId } = req.params;

    const deletedBooking = await Booking.findByIdAndUpdate(
        bookingId,
        { isDeleted: true },
        { new: true }
    );

    if (!deletedBooking) {
        return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Booking deleted successfully", deletedBooking });
})
