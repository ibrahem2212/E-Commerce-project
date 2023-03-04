const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const subcategorymodel = require("../models/subcategoryModel");
const ApiError = require("../utils/apiError");

exports.setcategoryIdtobody = (req, res, next) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
    next();
  }
};
// @desc      create subcategory
// @route     post  /api/v1/subcategories
// @access    private
exports.createSubCategory = asyncHandler(async (req, res) => {
  const { name, category } = req.body;
  const subCategory = await subcategorymodel.create({
    name,
    slug: slugify(name),
    category,
  });
  res.status(201).json({ data: subCategory });
});
//------------------------//--------------------------------//
// @desc      get list of categories
// @route     get  /api/v1/categories
// @access    public
exports.getsubcategories = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;
  let filterObject = {};
  if (req.params.categoryId) {
    filterObject = { category: req.params.categoryId };
  }

  const subcategories = await subcategorymodel
    .find(filterObject)
    .skip(skip)
    .limit(limit);

  // .populate({ path: "category", select: "name-_id" })
  res
    .status(200)
    .json({ results: subcategories.length, page, data: subcategories });
});

// @desc      get subcategory by id
// @route     get  /api/v1/subcategories/:id
// @access    private
exports.getsubcategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await subcategorymodel.findById(id);
  if (!subcategory) {
    // res.status(404).json({msg:`no subcategory for this id ${id}`});
    return next(new ApiError(`no subcategory for this id ${id}`, 404));
  }
  res.status(200).json({ data: subcategory });
});
//---------------------//----------------------------------//

// @desc      update subcategory by id
// @route     put  /api/v1/subcategories/:id
// @access    private
exports.updatesubcategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name, category } = req.body;
  const subcategory = await subcategorymodel.findByIdAndUpdate(
    { _id: id },
    { name, slug: slugify(name), category },
    { new: true }
  );
  if (!subcategory) {
    return next(new ApiError(`no subcategory for this id ${id}`, 404));
  }
  res.status(200).json({ data: subcategory });
});

// @desc      delete subcategory
// @route     delete  /api/v1/subcategories/:id
// @access    private

exports.deletesubcategory = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const subcategory = await subcategorymodel.findByIdAndDelete({ _id: id });
  if (!subcategory) {
    return next(new ApiError(`no subcategory for this id ${id}`, 404));
  }
  res.status(204).send();
});
