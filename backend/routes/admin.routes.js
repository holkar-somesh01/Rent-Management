const express = require("express");
const adminController = require('../controller/admin.controller')
const { adminProtected, LandlordProtected } = require("../middleware/Protected")
const router = express.Router()

router
    .get("/get-all-tenants", adminController.getAllTenants)
    .get("/get-all-landlords", adminController.getAllLandlords)
    .get("/get-payment", adminController.GetPayments)
    .get("/get-properties", adminController.GetProperties)
    .get("/find-property-details/:PropertyId", adminController.GetPropertyDetails)
    // .post("/add-properties", adminController.AddProperties)
    .post("/add-properties", LandlordProtected, adminController.AddProperties)
    .get("/find-users-details/:id", adminProtected, adminController.FindById)
    .put("/update-properties/:id", adminController.UpdateProperty)
    .put("/change-status/:id", adminController.changeStatus)
    .delete("/delete-properties/:id", adminController.SoftDeleteProperty)

module.exports = router
