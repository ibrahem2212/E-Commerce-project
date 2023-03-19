const Category = require("../models/categoryModel");
const factory = require("./handlersFactory");

// @desc      GET list of categories
// @route     GET  /api/v1/categories
// @access    Public
exports.getCategories = factory.getAll(Category);

// @desc      Get a specific category by id
// @route     Get  /api/v1/categories/:id
// @access    public
exports.getCategory = factory.getOne(Category);

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
