const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const interviewSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  rname: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  localgovernment: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  lastjob: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  froute: {
    type: Boolean,
  default:false
  },
  bolt: {
    type: Boolean,
    default:false
  },
  taxi: {
    type: Boolean,
    default:false
  },
  licence: {
    type: Boolean,
    default:false
  },
  edate: {
    type: String,
    required: true,
  },
  contract: {
    type: String,
    required: true,
  },
  date: {
    type: String,

  },
  status: {
    type: String,
    default:'Pending'
  }
});
module.exports = mongoose.model("Interview", interviewSchema);
