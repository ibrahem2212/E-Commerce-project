const Brand = require("../models/brandModel");
const factory = require("./handlersFactory");

// @desc      GET list of brands
// @route     GET  /api/v1/brands
// @access    Public
exports.getBrands = factory.getAll(Brand);

// @desc      Get a specific brand by id
// @route     Get  /api/v1/brands/:id
// @access    public
exports.getBrand = factory.getOne(Brand);
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
