const expressAsyncHandler = require('express-async-handler')
const User = require('../models/User')
const { Upload } = require('../utils/upload')
const { checkEmpty } = require('../utils/checkEmpty')
const bcrypt = require("bcryptjs")
const validator = require("validator")
const cloudinary = require('../utils/cloudinary.config')
const RentedProperty = require('../models/RentedProperty')
const Property = require('../models/Property')
const Payment = require('../models/Payment')
const { default: mongoose } = require('mongoose')


exports.getLandlordProfile = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await User.findById(id).populate("userId")
    res.json({ message: "Profile Fetch Success", result })
})
exports.updateLandlordProfile = expressAsyncHandler(async (req, res) => {
    Upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: "Multer Error", error: err?.message });
        }
        const { name, email, mobile, password } = req.body;
        const { landlordId } = req.params;
        console.log(req.body)
        console.log(req.files)
        if (!landlordId) {
            return res.status(400).json({ message: "Landlord ID is required" });
        }
        const { isError, error } = checkEmpty({ name, email, mobile, password });
        if (isError) {
            return res.status(400).json({ message: "All Fields Required", error });
        }
        if (email && !validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" });
        }
        if (mobile && !validator.isMobilePhone(mobile, "en-IN")) {
            return res.status(400).json({ message: "Invalid Mobile Number" });
        }
        const landlord = await User.findById(landlordId);
        if (!landlord) {
            return res.status(404).json({ message: "Landlord not found" });
        }
        const updates = {}
        if (name) updates.name = name;
        if (email) updates.email = email;
        if (mobile) updates.mobile = mobile;
        if (password) {
            const hash = await bcrypt.hash(password, 10);
            updates.password = hash;
        }
        const documents = landlord.documents || [];
        console.log("DATA comes Here")
        // if (req.files) {
        //     const filesArray = Array.isArray(req.files.documents) ? req.files.documents : [req.files.documents];
        //     for (const file of filesArray) {
        //         const result = await cloudinary.uploader.upload(file.path, {
        //             folder: "rent_management/documents",
        //         });
        //         documents.push(result.secure_url);
        //     }
        //     updates.documents = documents;
        // }
        if (req.files && req.files.documents) {
            const filesArray = Array.isArray(req.files.documents) ? req.files.documents : [req.files.documents];
            for (const file of filesArray) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "rent_management/documents",
                });
                documents.push(result.secure_url);
            }
            updates.documents = documents;
        }

        const updatedLandlord = await User.findByIdAndUpdate(landlordId, updates, { new: true });
        res.json({ message: "Landlord profile updated successfully", updatedLandlord });
    });
})
exports.updateTenant = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    Upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: "Multer Error", error: err?.message });
        }
        const { name, email, password, mobile } = req.body;
        if (!id) {
            return res.status(400).json({ message: "Tenant ID is required" });
        }
        if (email && !validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" });
        }
        if (password && !validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Provide Strong Password" });
        }
        if (mobile && !validator.isMobilePhone(mobile, "en-IN")) {
            return res.status(400).json({ message: "Invalid Mobile Number" });
        }
        const documents = [];
        if (req.files) {
            const filesArray = Array.isArray(req.files.documents) ? req.files.documents : [req.files.documents]
            for (const file of filesArray) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "rent_management/documents",
                })
                documents.push(result.secure_url)
            }
        }
        const updateData = { name, email, mobile };
        if (password) {
            const hashPass = await bcrypt.hash(password, 10);
            updateData.password = hashPass;
        }
        if (documents.length > 0) {
            updateData.documents = documents;
        }
        try {
            const updatedTenant = await User.findOneAndUpdate(
                { _id: id, role: "Tenant" },
                { $set: updateData },
                { new: true, runValidators: true }
            )
            if (!updatedTenant) {
                return res.status(404).json({ message: "Tenant not found" });
            }
            res.json({ message: "Tenant Update Success", result: updatedTenant });
        } catch (error) {
            res.status(500).json({ message: "Error updating tenant", error: error.message });
        }
    })
})
exports.FindById = expressAsyncHandler(async (req, res) => {
    const { id } = req.params
    const result = await User.findById(id)
    res.json({ message: `${result.role}  Find Success.`, result })
})
exports.getLandlordProperty = expressAsyncHandler(async (req, res) => {
    const result = await Property.find({ landlord: req.user, isRented: false }).populate("landlord")
    res.json({ message: "Property Fetch Success", result })
})
exports.registerTenant = expressAsyncHandler(async (req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        await new Promise((resolve, reject) => {
            Upload(req, res, (err) => (err ? reject(err) : resolve()));
        });

        const {
            name, email, password, mobile, role, property, rentAmount,
            leaseStart, leaseEnd, amount, paymentDate,
            paymentStatus, paymentMethod, transactionId, amountPaid
        } = req.body;

        const { isError, error } = checkEmpty({
            name, email, password, role, property, rentAmount, leaseStart
        });

        if (isError) throw new Error(error || "All Fields Required");
        if (!validator.isEmail(email)) throw new Error("Invalid Email");
        if (!validator.isStrongPassword(password)) throw new Error("Provide Strong Password");
        if (mobile && !validator.isMobilePhone(mobile, "en-IN")) throw new Error("Invalid Mobile Number");

        if (await User.findOne({ email })) throw new Error("Email Already Registered");

        const documents = [];
        if (req.files) {
            const filesArray = Array.isArray(req.files.documents) ? req.files.documents : [req.files.documents];
            const uploadPromises = filesArray.map(file =>
                cloudinary.uploader.upload(file.path, { folder: "rent_management/documents" })
            );
            const results = await Promise.all(uploadPromises);
            documents.push(...results.map(result => result.secure_url));
        }

        const hashPass = await bcrypt.hash(password, 10);
        const [user] = await User.create([{
            name, email, password: hashPass, mobile, documents,
            userId: req.user, role
        }], { session });

        let propertyRent;
        if (amount && paymentDate && paymentStatus && paymentMethod) {
            const [payment] = await Payment.create([{
                tenantId: user._id, amount, paymentDate,
                paymentStatus, paymentMethod, transactionId, amountPaid
            }], { session });

            propertyRent = await RentedProperty.create([{
                property, tenantId: user._id, rentAmount,
                leaseStart, leaseEnd, payments: [payment._id]
            }], { session });
            await User.findByIdAndUpdate(user._id, { $push: { payments: payment._id } }, { session });
        } else {
            propertyRent = await RentedProperty.create([{
                property, tenantId: user._id, rentAmount, leaseStart, leaseEnd
            }], { session });
        }
        await session.commitTransaction();
        res.json({ message: `${role} Register Success`, result: { ...user._doc, propertyRent } })
    } catch (error) {
        await session.abortTransaction()
        res.status(400).json({ message: error.message || "Server Error" })
    } finally {
        session.endSession()
    }
})
exports.getBookedProperty = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const result = await RentedProperty.find({ tenantId: id })
            .populate({
                path: "property",
                model: "Property"
            })
            .populate("tenantId")
            .populate("payments")

        res.json({ message: "Booked Property Fetched", result });
    } catch (error) {
        res.status(500).json({ message: "Error fetching booked property", error });
    }
})
exports.GetAllPayment = expressAsyncHandler(async (req, res) => {
    const result = await Payment.find().populate("tenantId").populate("propertyId")
    res.json({ message: "Payment Fetch Success", result })
})
exports.getDashboardStats = async (req, res) => {
    try {
        const [properties, tenants, payments] = await Promise.all([
            Property.find({ isDeleted: false }),
            User.find({ role: 'Tenant', isDeleted: false }),
            Payment.find({ isDeleted: false })
        ]);

        const totalRent = properties.reduce((sum, prop) => sum + (prop.rentPrice || 0), 0);

        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();

        const collectedRent = payments.reduce((sum, payment) => {
            const paymentDate = new Date(payment.paymentDate);
            return (
                paymentDate.getMonth() === currentMonth &&
                paymentDate.getFullYear() === currentYear &&
                payment.paymentStatus === "completed"
            )
                ? sum + (payment.amountPaid || 0)
                : sum;
        }, 0);

        const occupiedUnits = properties.filter(p => p.isRented).length;
        const occupancyRate = properties.length ? (occupiedUnits / properties.length) * 100 : 0;

        const pendingPayments = tenants.filter(tenant => {
            const hasPaid = payments.some(payment =>
                payment.tenantId?.toString() === tenant._id.toString() &&
                new Date(payment.paymentDate).getMonth() === currentMonth &&
                new Date(payment.paymentDate).getFullYear() === currentYear &&
                payment.paymentStatus === "completed"
            );
            return !hasPaid && tenant.status === 'active';
        });

        const recentProperties = properties
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(0, 2)
            .map(p => ({
                id: p._id,
                title: p.name,
                description: `Added on ${p.createdAt.toDateString()}`,
                type: 'property'
            }));

        const recentTenants = tenants
            .sort((a, b) => b.createdAt - a.createdAt)
            .slice(0, 2)
            .map(t => ({
                id: t._id,
                title: t.name,
                description: t.status === 'active' ? 'Active tenant' : 'Inactive tenant',
                type: 'tenant'
            }));

        const recentPayments = payments
            .sort((a, b) => b.paymentDate - a.paymentDate)
            .slice(0, 2)
            .map(p => ({
                id: p._id,
                title: `Payment of ₹${p.amountPaid}`,
                description: `Received on ${new Date(p.paymentDate).toDateString()}`,
                type: 'payment'
            }));

        const pendingPaymentList = await Promise.all(
            pendingPayments.slice(0, 3).map(async tenant => {
                const property = await Property.findById(tenant.property);
                return {
                    id: tenant._id,
                    name: tenant.name,
                    property: property?.name || 'Unknown',
                    amount: property?.rentPrice || 0
                };
            })
        )
        res.json({
            message: "GET Success",
            result: {
                statistics: {
                    totalRent,
                    collectedRent,
                    occupancyRate: occupancyRate.toFixed(2),
                    pendingPayments: pendingPayments.length
                },
                recentActivities: [...recentProperties, ...recentTenants, ...recentPayments].slice(0, 5),
                pendingPaymentList
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getAllTenant = expressAsyncHandler(async (req, res) => {
    const LandlordID = req.user
    const result = await User.find({ userId: LandlordID, role: "Tenant" })
    res.status(200).json({ message: "Tenant Fetch Success", result })
})
exports.getDashboardData = async (req, res) => {
    try {
        const pendingPayments = await Payment.find({ paymentStatus: "pending", isDeleted: false })
            .populate("tenantId", "name email")
            .populate("propertyId", "name location")
            .sort({ paymentDate: -1 })
            .limit(10);
        const recentPayments = await Payment.find({ paymentStatus: "completed", isDeleted: false })
            .populate("tenantId", "name email")
            .populate("propertyId", "name location")
            .sort({ updatedAt: -1 })
            .limit(10);

        const totalUsers = await User.countDocuments({
            isDeleted: false,
            role: { $in: ["Tenant", "Landlord"] },
        });
        const totalTenants = await User.countDocuments({ role: "Tenant", isDeleted: false });
        const totalLandlords = await User.countDocuments({ role: "Landlord", isDeleted: false });
        const totalProperties = await Property.countDocuments({ isDeleted: false });

        const recentProperties = await Property.find({ isDeleted: false })
            .sort({ createdAt: -1 })
            .limit(5);

        const recentTenants = await User.find({ role: "Tenant", isDeleted: false })
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            message: "Dashboard Data Fetch ", result: {
                stats: {
                    totalUsers,
                    totalTenants,
                    totalLandlords,
                    totalProperties,
                },
                pendingPayments,
                recentPayments,
                recentProperties,
                recentTenants,
            }
        });
    } catch (error) {
        console.error("Dashboard error:", error);
        res.status(500).json({ message: "Failed to load dashboard data", error });
    }
};

//  how to minimize Latency  of request 