const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");

const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const Category = require("../models/categoryModel");

//Upload single image
exports.uploadCategoryImage = uploadSingleImage("image");

//Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `category-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`uploads/categories/${filename}`);

  //Save image in our db
  req.body.image = filename;

  next();
});

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
