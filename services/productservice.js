const slugify = require("slugify");
const asyncHandler = require("express-async-handler");
const productmodel = require("../models/productModel");
const ApiError = require("../utils/apiError");
const ApiFeatures = require("../utils/apiFeatures");
//------------------------//--------------------------------//
// @desc      get list of products
// @route     get  /api/v1/products
// @access    public
exports.getproducts = asyncHandler(async (req, res) => {
  //1) Filtering
  // const queryStringObj = { ...req.query };
  // const excludeFields = ["page", "sort", "limit", "fields"];
  // excludeFields.forEach((field) => delete queryStringObj[field]);

  // let querystr = JSON.stringify(queryStringObj);
  // querystr = querystr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  //2) pagination
  // const page = req.query.page * 1 || 1;
  // const limit = req.query.limit * 1 || 50;
  // const skip = (page - 1) * limit;

  // build query
  const documentsCounts = await productmodel.countDocuments();
  const apiFeatures = new ApiFeatures(productmodel.find(), req.query)
    .paginate(documentsCounts)
    .filter()
    .search()
    .limitFields()
    .sort();

  // execute query
  const { mongooseQuery, paginationResult } = apiFeatures;
  const products = await mongooseQuery;

  res
    .status(200)
    .json({ results: products.length, paginationResult, data: products });
});

//3) sorting
// if (req.query.sort) {
//   const sortBy = req.query.sort.split(",").join(" ");
//   mongooseQuery = mongooseQuery.sort(sortBy);
// } else {
//   mongooseQuery = mongooseQuery.sort("-createdAt");
// }

//4) fields limiting

// if (req.query.fields) {
//   const fields = req.query.fields.split(",").join(" ");
//   mongooseQuery = mongooseQuery.select(fields);
// } else {
//   mongooseQuery = mongooseQuery.select("-__v");
// }

//4) keyword searching

// if(req.query.keyword)
// {
//   const query = {};
//   query.$or=[
//     {title:{$regex : req.query.keyword, $options: "i"}},
//     {description:{$regex : req.query.keyword,$options: "i"}}
//   ]
//   mongooseQuery=mongooseQuery.find(query);
// };

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
    .populate({ path: "subcategories", select: "name -_id" });
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
  if (req.body.title) {
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
