const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const Category = require("../models/categoryModel");
const factory = require("./handlersFactory");

// @desc      GET list of categories
// @route     GET  /api/v1/categories
// @access    Public
exports.getCategories = asyncHandler(async (req, res) => {
  // build query
  const documentsCounts = await Category.countDocuments();
  const apiFeatures = new ApiFeatures(Category.find(), req.query)
    .paginate(documentsCounts)
    .filter()
    .search()
    .limitFields()
    .sort();

  // execute query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const categories = await mongooseQuery;
  res
    .status(200)
    .json({ results: categories.length, paginationResult, data: categories });
});

// @desc      Get a specific category by id
// @route     Get  /api/v1/categories/:id
// @access    public
exports.getCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await Category.findById(id);
  if (!category) {
    return next(new ApiError(`no category for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc      Create category
// @route     post  /api/v1/categories
//@access Private
exports.createCategory = factory.createOne(Category);

// @desc      Update specific category
// @route     PUT  /api/v1/categories/:id
// @access    Private
exports.updateCategory = factory.updateOne(Category);

// @desc      Delete specific category
// @route     DELETE  /api/v1/categories/:id
// @access    Private
exports.deleteCategory = factory.deleteOne(Category);
