const express = require("express");
const { addDriver } = require("../../controller/driver/acceptDriver");
const router = express.Router();


router.route('/adddriver').post(addDriver)


module.exports=router