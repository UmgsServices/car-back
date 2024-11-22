const express = require("express");
const router = express.Router();
const {addCar}=require('../../controller/car/addCar');
const { addInput } = require("../../controller/car/editdaily");
const { addField } = require("../../controller/car/dailyInputs");
const { addRepairs } = require("../../controller/car/editRepairs");

router.route('/dailyinput/update/').post(addInput)
router.route('/repairs/update/').post(addRepairs)
router.route('/update/:id').get(addField)
router.route('/new').post(addCar)


module.exports=router