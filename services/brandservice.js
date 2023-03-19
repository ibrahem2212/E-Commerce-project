const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const Brand = require("../models/brandModel");
const factory = require("./handlersFactory");

// @desc      GET list of brands
// @route     GET  /api/v1/brands
// @access    Public
exports.getBrands = asyncHandler(async (req, res) => {
  // build query
  const documentsCounts = await Brand.countDocuments();
  const apiFeatures = new ApiFeatures(Brand.find(), req.query)
    .paginate(documentsCounts)
    .filter()
    .search()
    .limitFields()
    .sort();

  // execute query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const brands = await mongooseQuery;
  res
    .status(200)
    .json({ results: brands.length, paginationResult, data: brands });
});

// @desc      Get a specific brand by id
// @route     Get  /api/v1/brands/:id
// @access    public
exports.getBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await Brand.findById(id);
  if (!brand) {
    return next(new ApiError(`no brand for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// @desc      Create brand
// @route     post  /api/v1/categories
//@access Private

exports.createBrand = factory.createOne(Brand);

// @desc      Update specific brand
// @route     PUT  /api/v1/brands/:id
// @access    Private

exports.updateBrand = factory.updateOne(Brand);

// @desc      Delete specific brand
// @route     DELETE  /api/v1/brand/:id
// @access    Private
exports.deleteBrand = factory.deleteOne(Brand);
