const express = require("express");
const router = express.Router();
const {addInterview}=require('../../controller/interview/add')

router.route('/new').post(addInterview)


module.exports=router