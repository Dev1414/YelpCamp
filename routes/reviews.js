const express = require('express');
const router = express.Router({mergeParams : true});
const Review = require('../models/reviews')
const Campground = require('../models/campground');
const ExpressError = require('../utilities/ExpressError')
const catchAsync = require('../utilities/catchAsync');
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');
const { createReview, deleteReview } = require('../controllers/reviews');
const reviews = require('../controllers/reviews')


router.post('/',isLoggedIn, validateReview, catchAsync(createReview))

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(deleteReview))

module.exports = router