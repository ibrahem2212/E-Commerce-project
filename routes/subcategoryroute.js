const express = require("express");
const {
  createSubCategory,
  getsubcategory,
  getsubcategories,
  updatesubcategory,
  deletesubcategory,
  setcategoryIdtobody,
} = require("../services/subCategoryservice");
const {
  getSubCategoryValidator,
  createSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utils/validators/subCategoryValidator");

const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(setcategoryIdtobody, createSubCategoryValidator, createSubCategory)
  .get(getsubcategories);

router
  .route("/:id")
  .get(getSubCategoryValidator, getsubcategory)
  .put(updateSubCategoryValidator, updatesubcategory)
  .delete(deleteSubCategoryValidator, deletesubcategory);

module.exports = router;
