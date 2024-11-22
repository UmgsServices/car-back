const express = require("express");
const router = express.Router();

const { getDrivers } = require("../../controller/driver/getDrivers");

router.route('/list').get(getDrivers)


module.exports=router