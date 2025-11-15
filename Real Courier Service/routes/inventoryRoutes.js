const express = require('express');
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");



router.post("/addStock", inventoryController.stockIn);
router.get("/viewStockIn", inventoryController.getStockInView);
router.post("/removeStock", inventoryController.stockOut);
router.get("/viewStockOut", inventoryController.getStockOutView);
router.get("/inventories", inventoryController.getInventories);





module.exports = router;