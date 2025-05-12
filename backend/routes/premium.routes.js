const express = require("express");
const { LandlordProtected } = require("../middleware/Protected");
const { createPremiumOrder, verifyPremiumPayment, LandlordPremiumDetails, GetPremiumUser } = require("../controller/premium.controller");

const router = express.Router();

router.post("/order", LandlordProtected, createPremiumOrder)
    .post("/verify", LandlordProtected, verifyPremiumPayment)
    .get("/Landlord-Premium-Details", LandlordProtected, LandlordPremiumDetails)
    .get("/Get-Premium-Users", GetPremiumUser)


module.exports = router;
