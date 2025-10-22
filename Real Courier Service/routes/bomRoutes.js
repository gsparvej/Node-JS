const express = require('express');
const router = express.Router();
const bomController = require('../controllers/bomController');



router.post("/", bomController.saveBOM);



module.exports = router;