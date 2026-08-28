const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
  guest: {
    type:Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  listing: {
    type:Schema.Types.ObjectId,
    ref: "Listing",
    required: true
  }
});

module.exports = mongoose.model("Booking", bookingSchema);