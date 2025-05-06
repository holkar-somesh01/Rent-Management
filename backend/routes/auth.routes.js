const express = require("express");
const authController = require('../controller/auth.controller');
const { adminProtected, LandlordProtected } = require("../middleware/Protected");
const router = express.Router()

router
    .post("/admin/register", authController.registerAdmin)
    .post("/admin/login", authController.loginAdmin)
    .post("/admin/logout", authController.logoutAdmin)
    .post("/user/register", adminProtected, authController.registerUser)
    .post("/tenant/register", LandlordProtected, authController.registerUser)
    .post("/user/login", authController.loginUser)
    .post("/user/logout", authController.logoutUser)

module.exports = router;
