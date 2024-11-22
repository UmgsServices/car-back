const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const signupSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },

  email: String,
});
module.exports = mongoose.model("Signup", signupSchema);
