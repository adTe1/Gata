const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./../controllers/handlerFactory');




exports.setProductUsersIds = (req, res, next) => {
    // Allow nested routes 
    if (!req.body.product) req.body.product = req.params.productId;
    if (!req.body.user) req.body.user =req.user.id;
    next();
}

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);