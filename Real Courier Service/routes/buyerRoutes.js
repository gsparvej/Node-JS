const express = require('express');
const router = express.Router();
const buyerController = require("../controllers/buyerController");


router.post("/", buyerController.saveBuyer);
router.get("/", buyerController.getAllBuyer);
router.get("/:id", buyerController.getBuyerById);

module.exports =router;