const express = require('express');
const router = express.Router();
const bomController = require('../controllers/bomController');



router.post("/", bomController.saveBOM);
router.get("/styleCode/:styleCode", bomController.getBOMByStyleCode);



module.exports = router;