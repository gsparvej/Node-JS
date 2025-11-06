const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');



router.post("/", orderController.saveOrder);
router.get("/", orderController.getAllOrderList);
router.get("/:id", orderController.getOrderById);


module.exports = router;