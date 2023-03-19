const Product = require("../models/productModel");
const factory = require("./handlersFactory");
//------------------------//--------------------------------//
// @desc      get list of products
// @route     get  /api/v1/products
// @access    public
exports.getProducts = factory.getAll(Product, "Products");

// @desc      create product
// @route     post  /api/v1/products
// @access    private
exports.createProduct = factory.createOne(Product);

// @desc      get product by id
// @route     get  /api/v1/products/:id
// @access    private
exports.getProduct = factory.getOne(Product);

// @desc      update product by id
// @route     put  /api/v1/products/:id
// @access    private
exports.updateProduct = factory.updateOne(Product);

// @desc      delete product
// @route     delete  /api/v1/products/:id
// @access    private
exports.deleteProduct = factory.deleteOne(Product);
