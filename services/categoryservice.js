const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const categorymodel = require("../models/categorymodel");
const ApiError = require("../utils/apiError");
//------------------------//--------------------------------//
// @desc      get list of categories
// @route     get  /api/v1/categories
// @access    public
exports.getcategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const categories = await categorymodel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: categories.length, page, data: categories });
});

//---------------------//----------------------------------//
// @desc      create category
// @route     post  /api/v1/categories
// @access    private
exports.createcategory = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const category = await categorymodel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: category });
});

// @desc      get category by id
// @route     get  /api/v1/categories/:id
// @access    private
exports.getcategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await categorymodel.findById(id);
  if (!category) {
    // res.status(404).json({msg:`no category for this id ${id}`});
    return next(new ApiError(`no category for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});
// @desc      update category by id
// @route     put  /api/v1/categories/:id
// @access    private
exports.updatecategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const category = await categorymodel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!category) {
    return next(new ApiError(`no category for this id ${id}`, 404));
  }
  res.status(200).json({ data: category });
});

// @desc      delete category
// @route     delete  /api/v1/categories/:id
// @access    private

exports.deletecategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const category = await categorymodel.findByIdAndDelete({ _id: id });
  if (!category) {
    return next(new ApiError(`no category for this id ${id}`, 404));
  }
  res.status(204).send();
});
