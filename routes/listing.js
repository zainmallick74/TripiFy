const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const {isLoggedIn} = require("../middleware.js");
const listingController = require("../controllers/listings.js");

const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});


  //validate for server side
  const validateReview = (req, res, next) => {
    let {error} = reviewSchema.validate(req.body);
    if(error) {
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(400, errMsg);
    } else {
      next();
    }
  };

  router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
   isLoggedIn,
   upload.single('listing[image]'),
   wrapAsync(listingController.createRoute));
  
  //new Route
  router.get("/new", isLoggedIn, listingController.renderNewForm);


 router.route("/:id")
 .get( wrapAsync(listingController.showListing))
 .put(
  isLoggedIn,
  upload.single("listing[image]"),
   wrapAsync(listingController.updateRoute))
 .delete(isLoggedIn, wrapAsync(listingController.deleteRoute));

//Edit Route
router.get("/:id/edit", wrapAsync(listingController.editRoute));

module.exports = router;