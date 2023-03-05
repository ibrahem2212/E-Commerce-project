const express = require("express");
const {
  getProductValidator,
  createProductValidator,
  updateProductValidator,
  deleteProductValidator,
} = require("../utils/validators/productValidator");

const {
  createproduct,
  updateproduct,
  deleteproduct,
  getproduct,
  getproducts,
} = require("../services/productservice");

const router = express.Router();

router.route("/").get(getproducts).post(createProductValidator, createproduct);
router
  .route("/:id")
  .get(getProductValidator, getproduct)
  .put(updateProductValidator, updateproduct)
  .delete(deleteProductValidator, deleteproduct);
module.exports=router;
