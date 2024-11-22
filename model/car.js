const { UUID } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { v4 } = require('uuid')

const dailyInputSchema=new Schema({
  date:Date,
     comment:{
       type:String,
      
        },
        transactiontype:{
          type:String,
          default:'Transfer'
        },
        amount:{
          type:Number
        },
        daystatus:{
          type:Boolean,
          default:true
        },
        daybalance:{
          type:Number,
          default:0,
        },
        driver:String,
        
})
const repairSchema=new Schema({
  date:Date,
     description:{
       type:String,
      
        },
        type:{
          type:String,
          default:'Repair'
        },
        amount:{
          type:Number
        },
        driver:String,
        
})
const carSchema = new Schema({
  make: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  purchasedate:{
    type:String,
    required:true
  },
  purchaseprice:{
    type:String,
    required:true
  },
  chasisnumber:{
    type:String,
    required:true
  }
  ,
  driver: String,
  platenumber:String,
  paperdate:String,
  lastservice:String,
  carcode:String,
  purchaseamount:Number,
  dailybalance:Number,
   repairs: [repairSchema],
  dailyinput:[dailyInputSchema]
});
module.exports = mongoose.model("Car",carSchema);
