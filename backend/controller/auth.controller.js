const asyncHandler = require('express-async-handler');
const { checkEmpty } = require('../utils/checkEmpty');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { Upload } = require('../utils/upload');
const cloudinary = require('../utils/cloudinary.config');

// Register Admin
exports.registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password, mobile, documents, property, payments } = req.body;

    const { isError, error } = checkEmpty({ name, email, password });
    if (isError) {
        return res.status(400).json({ message: "All Fields Required", error });
    }
    if (!validator.isEmail(email)) {
        return res.status(400).json({ message: "Invalid Email" });
    }
    if (!validator.isStrongPassword(password)) {
        return res.status(400).json({ message: "Provide Strong Password" });
    }
    if (mobile && !validator.isMobilePhone(mobile, "en-IN")) {
        return res.status(400).json({ message: "Invalid Mobile Number" });
    }

    const isFound = await User.findOne({ email });
    if (isFound) {
        return res.status(400).json({ message: "Email Already Registered" });
    }

    const hashPass = await bcrypt.hash(password, 10);
    await User.create({
        name,
        email,
        password: hashPass,
        mobile,
        documents,
        property,
        payments,
        role: "superAdmin",
    });

    res.json({ message: "ADMIN REGISTER SUCCESS" });
})

// Login Admin
exports.loginAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const { error, isError } = checkEmpty({ username, password });
    if (isError) {
        return res.status(400).json({ message: "All Fields Required", error });
    }

    try {
        const isFound = await User.findOne({ $or: [{ email: username }, { mobile: username }] });
        if (!isFound) {
            return res.status(400).json({ message: "User Email OR Mobile Not Found" });
        }
        if (isFound.role !== "superAdmin") {
            return res.status(400).json({ message: "Your Role NOT Matched." });
        }
        if (isFound.isDeleted) {
            return res.status(400).json({ message: "Account is Deleted" });
        }

        const isVerify = await bcrypt.compare(password, isFound.password);
        if (!isVerify) {
            return res.status(400).json({ message: "Password Do Not Match" });
        }

        const token = jwt.sign({ userId: isFound._id, role: isFound.role }, process.env.JWT_KEY, { expiresIn: "15d" });
        res.cookie("SuperAdmin", token, {
            maxAge: 1000 * 60 * 60 * 24 * 15,
            httpOnly: true
        });

        res.json({
            message: "Credentials Verify Success.",
            result: {
                _id: isFound._id,
                name: isFound.name,
                email: isFound.email,
                mobile: isFound.mobile,
                role: isFound.role,
                documents: isFound.documents,
                property: isFound.property,
                payments: isFound.payments,
                status: isFound.status,
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
})

// Logout Admin
exports.logoutAdmin = asyncHandler(async (req, res) => {
    res.clearCookie("SuperAdmin");
    res.json({ message: "Admin Logout Success" });
})

// Register User's
exports.registerUser = asyncHandler(async (req, res) => {
    Upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: "Multer Error", error: err?.message })
        }
        const { name, email, password, mobile, role } = req.body;
        const { isError, error } = checkEmpty({ name, email, password, role })
        if (isError) {
            return res.status(400).json({ message: "All Fields Required", error });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Provide Strong Password" });
        }
        if (mobile && !validator.isMobilePhone(mobile, "en-IN")) {
            return res.status(400).json({ message: "Invalid Mobile Number" });
        }

        const isFound = await User.findOne({ email });
        if (isFound) {
            return res.status(400).json({ message: "Email Already Registered" });
        }
        const documents = []
        if (req.files) {
            const filesArray = Array.isArray(req.files.documents) ? req.files.documents : [req.files.documents];
            for (const file of filesArray) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "rent_management/documents",
                });
                documents.push(result.secure_url);
            }
        }
        const hashPass = await bcrypt.hash(password, 10);
        const result = await User.create({
            name,
            email,
            password: hashPass,
            mobile,
            documents,
            userId: req.user,
            role: role,
        });

        res.json({ message: `${result.role} Register Success`, result })
    })
})
exports.registerLandlord = asyncHandler(async (req, res) => {
    Upload(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: "Multer Error", error: err?.message })
        }
        const { name, email, password, mobile, role } = req.body;
        const { isError, error } = checkEmpty({ name, email, password, role })
        if (isError) {
            return res.status(400).json({ message: "All Fields Required", error });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Provide Strong Password" });
        }
        if (mobile && !validator.isMobilePhone(mobile, "en-IN")) {
            return res.status(400).json({ message: "Invalid Mobile Number" });
        }

        const isFound = await User.findOne({ email });
        if (isFound) {
            return res.status(400).json({ message: "Email Already Registered" });
        }
        const documents = []
        if (req.files) {
            const filesArray = Array.isArray(req.files.documents) ? req.files.documents : [req.files.documents];
            for (const file of filesArray) {
                const result = await cloudinary.uploader.upload(file.path, {
                    folder: "rent_management/documents",
                });
                documents.push(result.secure_url);
            }
        }
        const hashPass = await bcrypt.hash(password, 10);
        const result = await User.create({
            name,
            email,
            password: hashPass,
            mobile,
            documents,
            role: role,
        });

        res.json({ message: `${result.role} Register Success`, result })
    })
})

// Login User's
exports.loginUser = asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const { isError, error } = checkEmpty({ username, password })
    if (isError) {
        return res.status(400).json({ message: "All Fields Required", error });
    }
    try {
        const user = await User.findOne({ $or: [{ email: username }, { mobile: username }] });
        if (!user) {
            return res.status(400).json({ message: "User Email OR Mobile Not Found" });
        }
        if (user.isDeleted) {
            return res.status(400).json({ message: "Account is Deleted" })
        }
        if (user.status === "inactive") {
            return res.status(400).json({ message: "Account is Deactivated. Contact To Admin" })
        }
        if (user.role === "superAdmin") {
            return res.status(400).json({ message: "Your Role NOT Matched." })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Password Do Not Match" })
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_KEY, { expiresIn: "1d" });
        const role = user.role.toLowerCase();
        res.cookie(role, token, {
            maxAge: 1000 * 60 * 60 * 24,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict"
        })
        res.json({
            message: "Login Successful",
            token,
            result: {
                _id: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                role: user.role,
                documents: user.documents,
                property: user.property,
                payments: user.payments,
                status: user.status,
            },
        });

    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})

// Logout User's
exports.logoutUser = asyncHandler(async (req, res) => {
    try {
        res.clearCookie("landlord");
        res.clearCookie("tenant");
        res.clearCookie("manager");
        res.clearCookie("superAdmin");
        res.json({ message: "Logout Successful" });
    } catch (error) {
        console.error("Logout Error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
})
