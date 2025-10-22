const express = require('express');
const router = express.Router();
const bomStyleController = require('../controllers/bomStyleController');

router.post("/", bomStyleController.saveBomstyle);
router.get("/", bomStyleController.getAllBomStyle);






module.exports = router;