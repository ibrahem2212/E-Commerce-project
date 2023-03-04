const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const brandmodel = require("../models/brandmodel");
const ApiError = require("../utils/apiError");
//------------------------//--------------------------------//
// @desc      get list of brands
// @route     get  /api/v1/brands
// @access    public
exports.getbrands = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const brands = await brandmodel.find({}).skip(skip).limit(limit);
  res.status(200).json({ results: brands.length, page, data: brands });
});

//---------------------//----------------------------------//
// @desc      create brand
// @route     post  /api/v1/brands
// @access    private
exports.createbrand = asyncHandler(async (req, res) => {
  const { name } = req.body;
  const brand = await brandmodel.create({ name, slug: slugify(name) });
  res.status(201).json({ data: brand });
});

// @desc      get brand by id
// @route     get  /api/v1/brands/:id
// @access    private
exports.getbrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandmodel.findById(id);
  if (!brand) {
    // res.status(404).json({msg:`no category for this id ${id}`});
    return next(new ApiError(`no brand for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});
// @desc      update brand by id
// @route     put  /api/v1/brands/:id
// @access    private
exports.updatebrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { name } = req.body;
  const brand = await brandmodel.findOneAndUpdate(
    { _id: id },
    { name, slug: slugify(name) },
    { new: true }
  );
  if (!brand) {
    return next(new ApiError(`no brand for this id ${id}`, 404));
  }
  res.status(200).json({ data: brand });
});

// @desc      delete brand
// @route     delete  /api/v1/brands/:id
// @access    private

exports.deletebrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const brand = await brandmodel.findByIdAndDelete({ _id: id });
  if (!brand) {
    return next(new ApiError(`no brand for this id ${id}`, 404));
  }
  res.status(204).send();
});
