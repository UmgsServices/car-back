const express = require("express");
const router = express.Router();

const { getInfo } = require("../../controller/driver/getInfo");

router.route('/info/:id').get(getInfo)


module.exports=router