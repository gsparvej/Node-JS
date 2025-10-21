const express = require('express');
const router = express.Router();
const itemController = require("../controllers/itemController");


router.get("/", itemController.getAllItems);
router.post("/", itemController.saveItem);
router.get("/:id", itemController.getItemById);





module.exports = router;