const asyncHandler = require("express-async-handler");

const factory = require("./handlersFactory");
const Review = require("../models/reviewModel");

// @desc      GET list of revews
// @route     GET  /api/v1/reviews
// @access    Public
exports.getReviews = factory.getAll(Review);

// @desc      Get a specific review by id
// @route     Get  /api/v1/reviews/:id
// @access    public
exports.getReview = factory.getOne(Review);

// @desc      Create review
// @route     post  /api/v1/reviews
// @access    Private/Protect/User
exports.createReview = factory.createOne(Review);

// @desc      Update specific review
// @route     PUT  /api/v1/reviews/:id
// @access    Private/Protect/User
exports.updateReview = factory.updateOne(Review);

// @desc      Delete specific review
// @route     DELETE  /api/v1/review/:id
// @access    Private/Protect/User-Admin-Manager
exports.deleteReview = factory.deleteOne(Review);
