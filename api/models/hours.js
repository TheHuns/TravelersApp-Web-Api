const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const hoursSchema = new Schema({
  businessId: String,
  monday: Array,
  tuesday: Array,
  wednesday: Array,
  thursday: Array,
  friday: Array,
  saturday: Array,
  sunday: Array
});

module.exports = mongoose.model("Hours", hoursSchema);
