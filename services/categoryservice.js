const multer = require("multer");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const factory = require("./handlersFactory");

const Category = require("../models/categoryModel");
const ApiError = require("../utils/apiError");

// 1- DiskStorage engine
// const multerStorage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/categories");
//   },
//   filename: function (req, file, cb) {
//     //category-${id}-Date.now().jpeg
//     const ext = file.mimetype.split("/")[1];
//     const filename = `category-${uuidv4()}-${Date.now()}.${ext}`;
//     cb(null, filename);
//   },
// });

// 2- Memory storage engine
const multerStorage = multer.memoryStorage();

const multerFilter = function (req, file, cb) {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new ApiError("Only Image allowed", 400), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadCategoryImage = upload.single("image");

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
