const Listing = require("../models/listing");
const Booking = require("../models/booking");

module.exports.myBookings = async (req, res) => {
  const bookings = await Booking.find({
    guest: req.user._id
  }).populate("listing");

  res.render("bookings/myBookings", {bookings})
}

module.exports.addBooking =async (req, res) => {
  const { listingId } = req.params;
  const listing = await Listing.findById(listingId);

  if(!listing) {
    req.flash("error", "Property not found");
    return res.redirect("/listings");
  }

  //check if already booked
  const alreadyBooked = await Booking.findOne({
    guest: req.user._id,
    listing: listingId
  });

  if(alreadyBooked) {
    req.flash("error", "You already booked this property");
    return res.redirect(`/listings/${listingId}`);
  }

  //create booking
  const booking = new Booking({
    guest: req.user._id,
    listing: listing._id
  });

  await booking.save();

  req.flash("success", "property booked seccessfully!");
  res.redirect("/bookings/my-bookings");
}