const express = require("express");
const router = express.Router();
const getInterview=require('../../controller/interview/getInterview')

router.route('/data').get(getInterview)


module.exports=router