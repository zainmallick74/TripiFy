const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review");
const { required } = require("joi");

const listingSchema = new Schema({
  title:{
   type: String,
   required: true,
  },
  description: String,

  images: [
    {
        url: String,
        filename: String,
    }
],

  price: Number,
  city: String,
  state: String,
  country: String,
  type: {
    type:String,
    required:true,
  },
  destination:{
    type:String,
  },

  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    }
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  }

});


listingSchema.post("findOneAndDelete", async (listing) => {
  if(listing) {
    await Review.deleteMany({_id : {$in: listing.reviews}})
  }
 
})


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;