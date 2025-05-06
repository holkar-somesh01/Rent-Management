const router = require("express").Router()
const landlordController = require("../controller/landlord.controller")
const { LandlordProtected } = require("../middleware/Protected")


router
    .get("/get-profile/:id", landlordController.getLandlordProfile)
    .put("/update-profile/:landlordId", landlordController.updateLandlordProfile)
    .put("/update-tenant/:id", landlordController.updateTenant)
    .get("/tenant-details/:id", landlordController.FindById)
    .post("/register-tenant", LandlordProtected, landlordController.registerTenant)
    .get("/get-landlord-property", LandlordProtected, landlordController.getLandlordProperty)
    .get("/get-booked-property/:id", LandlordProtected, landlordController.getBookedProperty)
    .get("/get-payment", LandlordProtected, landlordController.GetAllPayment)
    .get("/dashboard", landlordController.getDashboardStats)
    .get("/dashboard-recent-activity", landlordController.getDashboardData)
    .get("/get-all-tenants", LandlordProtected, landlordController.getAllTenant)

module.exports = router