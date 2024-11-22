const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const driverSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  car: {
    type: String,
    required: true,
  },
  contract: {
    type: String,
    required: true,
  },
  dailybalance: {
    type: Number,
    required: true,
  },
  initialdeposite: {
    type: String,
  },
  startdate: {
    type: String,
    required: true,
  },
  purchaseamount:String,
  drivercode:String,
});
module.exports = mongoose.model("Driver",driverSchema);
