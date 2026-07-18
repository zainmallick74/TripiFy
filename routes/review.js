const express = require("express");
const router = express.Router({mergeParams: true});
const {isLoggedIn, isReviewAuthor} = require("../middleware.js");

const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");
const Listing = require("../models/listing");
const Review = require("../models/review.js");
const reviewController = require("../controllers/review.js");

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

//REVIEW ROUTE
router.post("/",
  isLoggedIn,
  validateReview,
  wrapAsync(reviewController.createReview));

//DELETE REVIEW ROUTE
router.delete("/:reviewId",
  isLoggedIn,
  isReviewAuthor,
  wrapAsync(reviewController.deleteReview));

module.exports = router;