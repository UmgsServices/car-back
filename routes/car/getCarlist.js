const express = require("express");
const router = express.Router();

const { getCars } = require("../../controller/car/getCars");

router.route('/list').get(getCars)


module.exports=router