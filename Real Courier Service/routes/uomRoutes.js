const express = require('express');
const router = express.Router();
const uomController = require('../controllers/uomController');



router.post("/", uomController.saveUOM);
router.get("/", uomController.getAllUOM);


module.exports = router;