const express = require("express");

const {
  addProductToCart,
  //   getLoggedUserCart,
  //   removeSpecificCartItem,
  //   clearCart,
  //   updateCartItemQuantity,
  //   applyCoupon,
} = require("../services/cartService");
const authService = require("../services/authService");

const router = express.Router();

router
  .route("/")
  .post(authService.protect, authService.allowedTo("user"), addProductToCart);
//   .get(getLoggedUserCart)
//   .delete(clearCart);

// router.put("/applyCoupon", applyCoupon);

// router
//   .route("/:itemId")
//   .put(updateCartItemQuantity)
//   .delete(removeSpecificCartItem);

module.exports = router;
