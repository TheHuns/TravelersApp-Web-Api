const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Location", locationSchema);
