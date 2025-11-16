const express = require('express');
const router = express.Router();
const productionOrderController = require('../controllers/productionOrderController');



router.post("/", productionOrderController.addProductionOrder);
router.get("/", productionOrderController.getAllProductionOrder);



module.exports = router;