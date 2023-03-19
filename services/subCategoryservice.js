const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
const SubCategory = require("../models/subCategoryModel");
const factory = require("./handlersFactory");

exports.setCategoryIdToBody = (req, res, next) => {
  //Nested Route
  if (!req.body.category) req.body.category = req.params.categoryId;
  next();
};
// @desc      Create subcategory
// @route     post  /api/v1/subcategories
//@access Private

exports.createSubCategory = factory.createOne(SubCategory);

//Nested route
//GET  /api/v1/categories/:categoryId/subcategories
exports.createFilterObj = (req, res, next) => {
  let filterObject = {};
  if (req.params.categoryId) filterObject = { category: req.params.categoryId };
  req.filterObj = filterObject;
  next();
};

// @desc      GET list of subcategories
// @route     GET  /api/v1/subcategories
// @access    Public

exports.getSubCategories = asyncHandler(async (req, res) => {
  // build query
  const documentsCounts = await SubCategory.countDocuments();
  const apiFeatures = new ApiFeatures(SubCategory.find(), req.query)
    .paginate(documentsCounts)
    .filter()
    .search()
    .limitFields()
    .sort();

  // execute query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const subCategories = await mongooseQuery;

  res.status(200).json({
    results: subCategories.length,
    paginationResult,
    data: subCategories,
  });
});

// @desc      Get a specific subcategory by id
// @route     Get  /api/v1/subcategories/:id
// @access    public
exports.getSubCategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subCategory = await SubCategory.findById(id);
  if (!subCategory) {
    return next(new ApiError(`no subcategory for this id ${id}`, 404));
  }
  res.status(200).json({ data: subCategory });
});

// @desc      Update specific subcategory
// @route     PUT  /api/v1/subcategories/:id
// @access    Private
exports.updateSubCategory = factory.updateOne(SubCategory);

// @desc      Delete specific subcategory
// @route     DELETE  /api/v1/subcategories/:id
// @access    Private
exports.deleteSubCategory = factory.deleteOne(SubCategory);
