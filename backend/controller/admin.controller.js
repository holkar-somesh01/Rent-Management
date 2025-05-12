const expressAsyncHandler = require("express-async-handler");
const User = require("../models/User");
const Payment = require("../models/Payment");
const Property = require("../models/Property");
const { checkEmpty } = require("../utils/checkEmpty");
const cloudinary = require("../utils/cloudinary.config");
const { Upload } = require("../utils/upload");

exports.getAllTenants = expressAsyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = req.query.filter || '';
    const { userId } = req.query
    let filterQuery = { isDeleted: false, userId: userId, role: "Tenant" }
    const Tenants = await User.find(filterQuery)
        .populate('userId')
        // .populate('payments')                // UnComment When Payment Is Registered
        .populate('property')
        .skip(skip)
        .limit(limit)
        .exec();

    const totalTenants = await User.countDocuments(filterQuery);
    return res.status(200).json({
        page,
        limit,
        success: true,
        message: 'Tenants fetched successfully',
        total: totalTenants,
        totalPages: Math.ceil(totalTenants / limit),
        data: Tenants,
    });
})
exports.getAllLandlords = expressAsyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const filter = req.query.filter || '';

    let filterQuery = { isDeleted: false, role: "Landlord" };
    const Landlords = await User.find(filterQuery)
        .populate('userId')
        // .populate('payments')                // UnComment When Payment Is Registered
        .populate('property')
        .skip(skip)
        .limit(limit)
        .exec();

    const totalLandlords = await User.countDocuments(filterQuery);
    return res.status(200).json({
        page,
        limit,
        success: true,
        message: 'Landlords fetched successfully',
        total: totalLandlords,
        totalPages: Math.ceil(totalLandlords / limit),
        data: Landlords,
    });
})
exports.FindById = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await User.findById(id)
    res.json({ message: `${result.role}  Find Success.`, result })
})
exports.GetPayments = expressAsyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit
    const filter = req.query.filter || ''

    let filterQuery = { isDeleted: false }
    const payment = await Payment.find(filterQuery)
        .populate('rentedProperty')
        .skip(skip)
        .limit(limit)
        .exec()

    const totalPayment = await Payment.countDocuments(filterQuery)
    return res.status(200).json({
        page,
        limit,
        success: true,
        message: 'Payment fetched successfully',
        total: totalPayment,
        totalPages: Math.ceil(totalPayment / limit),
        data: payment,
    })
})
exports.GetProperties = expressAsyncHandler(async (req, res) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit
    const filter = req.query.filter || ''
    const { id } = req.query
    let filterQuery = { isDeleted: false, landlord: id }
    const Properties = await Property.find(filterQuery)
        .populate('landlord')
        .skip(skip)
        .limit(limit)
        .exec()

    const totalProperties = await Property.countDocuments(filterQuery)
    return res.status(200).json({
        page,
        limit,
        success: true,
        message: 'Properties fetched successfully',
        total: totalProperties,
        totalPages: Math.ceil(totalProperties / limit),
        data: Properties,
    })
})
exports.AddProperties = expressAsyncHandler(async (req, res) => {
    try {
        Upload(req, res, async (err) => {
            if (err) {
                console.log("Multer Error:", err);
                return res.status(400).json({ message: "Multer Error", error: err?.message });
            }
            const { name, location, size, rentPrice, isRented, type } = req.body;
            const { isError, error } = checkEmpty({ name, location, size, rentPrice, isRented, type });
            if (isError) {
                return res.status(400).json({ message: "All Fields Required.", error });
            }
            const images = []
            const documents = []
            try {
                if (req.files && req.files.images) {
                    for (const file of req.files.images) {
                        const uploadedImage = await cloudinary.uploader.upload(file.path, {
                            folder: "rent_management/images",
                        });
                        images.push(uploadedImage.secure_url);
                    }
                }
                if (req.files && req.files.documents) {
                    for (const file of req.files.documents) {
                        const uploadedDoc = await cloudinary.uploader.upload(file.path, {
                            folder: "rent_management/documents",
                        });
                        documents.push(uploadedDoc.secure_url);
                    }
                }
                const result = await Property.create({
                    name, location, size, rentPrice, documents, images, landlord: req.user, isRented, type
                })
                res.json({ message: "Property Added Successfully", result })
            } catch (uploadError) {
                console.error("Cloudinary or Database Error:", uploadError);
                return res.status(500).json({ message: "Error adding property", error: uploadError.message });
            }
        });
    } catch (error) {
        console.error("Unhandled Error:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
})
exports.GetPropertyDetails = expressAsyncHandler(async (req, res) => {
    const { PropertyId } = req.params
    const result = await Property.findById(PropertyId)
    res.json({ message: "Details Fetch Success", result })
})
exports.UpdateProperty = expressAsyncHandler(async (req, res) => {
    Upload(req, res, async (err) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: "Multer Error", error: err?.message });
        }

        const { id } = req.params;
        const { name, location, size, rentPrice, isRented, type } = req.body;

        if (!id) {
            return res.status(400).json({ message: "Property ID is required." });
        }

        const { isError, error } = checkEmpty({ name, location, size, rentPrice, isRented, type });
        if (isError) {
            return res.status(400).json({ message: "All Fields Required.", error });
        }
        const property = await Property.findById(id);
        if (!property) {
            return res.status(404).json({ message: "Property not found." });
        }
        if (property.images && property.images.length > 0) {
            for (const image of property.images) {
                const publicId = image.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            }
        }
        if (property.documents && property.documents.length > 0) {
            for (const document of property.documents) {
                const publicId = document.split('/').pop().split('.')[0];
                await cloudinary.uploader.destroy(publicId);
            }
        }
        const images = [];
        if (req.files && req.files.images) {
            for (const file of req.files.images) {
                const uploadedImage = await cloudinary.uploader.upload(file.path, {
                    folder: "rent_management/images",
                });
                images.push(uploadedImage.secure_url);
            }
        }
        const documents = [];
        if (req.files && req.files.documents) {
            for (const file of req.files.documents) {
                const uploadedDoc = await cloudinary.uploader.upload(file.path, {
                    folder: "rent_management/images",
                });
                documents.push(uploadedDoc.secure_url);
            }
        }
        const result = await Property.findByIdAndUpdate(id, {
            name, location, size, rentPrice, isRented, type, images, documents
        }, { new: true })
        res.json({ message: "Property Updated Successfully", result });
    });
})
exports.SoftDeleteProperty = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).json({ message: "Property ID is required." });
    }
    const property = await Property.findById(id)
    if (!property) {
        return res.status(404).json({ message: "Property not found." });
    }
    if (property.isDeleted) {
        return res.status(400).json({ message: "Property is already deleted." });
    }
    const result = await Property.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    res.json({ message: "Property soft deleted successfully.", result });
})
exports.changeStatus = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    if (!id) {
        return res.status(400).json({ message: "User id is Required." })
    }
    const result = await User.findByIdAndUpdate(id, { status })
    return res.json({ message: "Status Update Success" })
})