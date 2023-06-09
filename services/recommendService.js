const asyncHandler = require("express-async-handler");
const axios = require("axios");
const Product = require("../models/productModel");
const ApiError = require("../utils/apiError");

//1) find logged user to get id
//2) fetch flask api with user id
//3) find products from api ids

exports.getRecommend = asyncHandler(async (req, res, next) => {
  //-------------- 1) find logged user to get id --------------------
  const id = req.user._id;

  //-------------- 2) fetch recommendation api -----------------------
  const firstAPIUrl = `http://tonymalak222.pythonanywhere.com/?data=646f805e60ecfa94727794c2`;
  // const firstAPIUrl = `http://tonymalak222.pythonanywhere.com/?data=${id}`;

  const response = await axios.get(firstAPIUrl);
  const productIds = response.data.res;

  //------------- 3) find products from api ids  -------------------

  const recommendProducts = await Product.find({ _id: { $in: productIds } });
  if (!recommendProducts) {
    return next(new ApiError(`No document for this id ${req.user._id}`, 404));
  }
  res
    .status(200)
    .json({ results: recommendProducts.length, data: recommendProducts });
});
