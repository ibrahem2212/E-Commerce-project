const express = require("express");
// const {
//   getProductValidator,
//   createProductValidator,
//   updateProductValidator,
//   deleteProductValidator,
// } = require('../utils/validators/productValidator');
const {getLoggedUserData} =require('../services/userService');

const { getRecommend } = require("../services/recommendService");
const authService = require("../services/authService");

const router = express.Router();

router.route("/").get(authService.protect,getLoggedUserData,getRecommend);

module.exports = router;
