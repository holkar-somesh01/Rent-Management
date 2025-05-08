const express = require("express");
const { LandlordProtected } = require("../middleware/Protected");
const { createPremiumOrder, verifyPremiumPayment } = require("../controller/premium.controller");

const router = express.Router();

router.post("/order", LandlordProtected, createPremiumOrder);
router.post("/verify", LandlordProtected, verifyPremiumPayment);

module.exports = router;
