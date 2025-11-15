const express = require('express');
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");



router.post("/addStock", inventoryController.stockIn);





module.exports = router;