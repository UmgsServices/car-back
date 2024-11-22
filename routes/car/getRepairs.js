const express = require("express");
const router = express.Router();

const { getRepairs } = require("../../controller/car/getRepairs");

router.route('/repairs/:id').get(getRepairs)


module.exports=router