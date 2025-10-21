const express = require('express');
const router = express.Router();
const vendorController = require("../controllers/vendorController");


router.get("/" , vendorController.getAllVendors);
router.post("/", vendorController.saveVendor);
router.get("/:id", vendorController.getVendorById);


module.exports = router;