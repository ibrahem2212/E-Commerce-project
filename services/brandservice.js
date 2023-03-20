const asyncHandler = require("express-async-handler");
const { v4: uuidv4 } = require("uuid");
const sharp = require("sharp");

const factory = require("./handlersFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const Brand = require("../models/brandModel");

//Upload single image
exports.uploadBrandImage = uploadSingleImage("image");

//Image processing
exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `brand-${uuidv4()}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(600, 600)
    .toFormat("jpeg")
    .jpeg({ quality: 95 })
    .toFile(`uploads/brands/${filename}`);

  //Save image in our db
  req.body.image = filename;

  next();
});

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
