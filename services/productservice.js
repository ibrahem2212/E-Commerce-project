const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const productmodel = require("../models/productModel");
const ApiError = require("../utils/apiError");
//------------------------//--------------------------------//
// @desc      get list of products
// @route     get  /api/v1/products
// @access    public
exports.getproducts = asyncHandler(async (req, res) => {
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 || 5;
  const skip = (page - 1) * limit;

  const products = await productmodel
    .find({})
    .skip(skip)
    .limit(limit)
    .populate({ path: "category", select: "name -_id" })
    .populate({ path: "subcategories", select: "name -_id" });
  res.status(200).json({ results: products.length, page, data: products });
});

//---------------------//----------------------------------//
// @desc      create product
// @route     post  /api/v1/products
// @access    private
exports.createproduct = asyncHandler(async (req, res) => {
  req.body.slug = slugify(req.body.title);
  const product = await productmodel.create(req.body);
  res.status(201).json({ data: product });
});

// @desc      get product by id
// @route     get  /api/v1/products/:id
// @access    private
exports.getproduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productmodel
    .findById(id)
    .populate({ path: "category", select: "name -_id" })
    .populate({ path: "subcategory", select: "name -_id" });
  if (!product) {
    // res.status(404).json({msg:`no product for this id ${id}`});
    return next(new ApiError(`no product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});
// @desc      update product by id
// @route     put  /api/v1/products/:id
// @access    private
exports.updateproduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if(req.body.title){
  req.body.slug = slugify(req.body.title);
  }
  const product = await productmodel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new ApiError(`no product for this id ${id}`, 404));
  }
  res.status(200).json({ data: product });
});

// @desc      delete product
// @route     delete  /api/v1/products/:id
// @access    private

exports.deleteproduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const product = await productmodel.findByIdAndDelete({ _id: id });
  if (!product) {
    return next(new ApiError(`no product for this id ${id}`, 404));
  }
  res.status(204).send();
});
