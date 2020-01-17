const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const venueSchema = new Schema({
  businessName: String,
  category: String,
  website: String,
  phone: String,
  address: String,
  locationId: String,
  state: String,
  zip: Number,
  hours: Object,
  parking: String
});

module.exports = mongoose.model("Venue", venueSchema);
