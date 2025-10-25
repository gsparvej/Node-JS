const express = require('express');
const router = express.Router();
const purchaseController = require("../controllers/purchaseController");



router.post("/", purchaseController.createPurchaseOrder);
router.get("/" , purchaseController.getAllPurchaseOrder);
router.get("/:id", purchaseController.getPOById);

module.exports = router;