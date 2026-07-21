const Listing = require("../models/listing");
let {listingSchema} = require("../schema");


module.exports.index = async(req, res) => {
  let allListing;

  let filter = {};

  if(req.query.type) {
    filter.type = req.query.type
  }
  if(req.query.country) {
   filter.country = req.query.country;
  }
  
   allListing = await Listing.find(filter);

  res.render("listings/index.ejs", {allListing});

  if(req.query.country) {

  }
};


module.exports.renderNewForm = (req, res) => {
 res.render("listings/new.ejs")
}

module.exports.showListing = async(req, res) => {
  let {id} = req.params;
  const listing = await Listing.findById(id)
  .populate({path: "reviews", 
    populate: {
    path: "author",
  },
})
  .populate("owner");
  if(!listing) {
    req.flash("error", "Listing you requested for does not exist");
    req.listing("/listings")
  }
 
  res.render("listings/show.ejs", {listing});
}

//create Route
module.exports.createRoute = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  let result = listingSchema.validate(req.body);
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = {url, filename};
  await newListing.save();
  req.flash("success", "new Listing created")
  res.redirect("/listings");
 }


//Edit Route
 module.exports.editRoute = async(req, res) => {
   let {id} = req.params;
   const listing = await Listing.findById(id);
   res.render("listings/edit", { listing });
 }

 //Update Route
 module.exports.updateRoute = async(req, res) => {
 
   if(!req.body.listing) {
     throw new ExpressError(400, "Send valid data for listing")
   }
 
   let {id} = req.params;
   let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});
   if(typeof req.file !== "undefined") {
   let url = req.file.path;
   let filename = req.file.filename;
   listing.image = {url, filename };
   await listing.save();
   }

   res.redirect(`/listings/${id}`);
 }

 //Delete Route

 module.exports.deleteRoute = async(req, res) => {
  let {id} = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
}