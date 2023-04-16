const asyncHandler = require("express-async-handler");
const ApiError = require("../utils/apiError");

const Product = require("../models/productModel");
const Cart = require("../models/cartModel");

// @desc    Add product to  cart
// @route   POST /api/v1/cart
// @access  Private/User
exports.addProductToCart = asyncHandler(async (req, res, next) => {
  const { productId, color } = req.body;
  const product = await Product.findById(productId);
  // 1) Get Cart for logged user
  let cart = await Cart.findOne({ user: req.user._id });

  if (!cart) {
    // create cart fot logged user with product
    cart = await Cart.create({
      user: req.user._id,
      cartItems: [{ product: productId, color, price: product.price }],
    });
  } else {
    console.log("There is cart");
    // // product exist in cart, update product quantity
    // const productIndex = cart.cartItems.findIndex(
    //   (item) => item.product.toString() === productId && item.color === color
    // );
    // if (productIndex > -1) {
    //   const cartItem = cart.cartItems[productIndex];
    //       cartItem.quantity += 1;
    //       cart.cartItems[productIndex] = cartItem;
    //     } else {
    //       // product not exist in cart,  push product to cartItems array
    //       cart.cartItems.push({ product: productId, color, price: product.price });
    //     }
  }
});
