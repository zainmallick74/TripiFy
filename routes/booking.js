const express = require("express");
const router = express.Router();

const bookingController = require("../controllers/booking");

router.get("/my-bookings", bookingController.myBookings);
router.post("/:listingId", bookingController.addBooking);

module.exports = router;