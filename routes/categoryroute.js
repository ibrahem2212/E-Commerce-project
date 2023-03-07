const express = require('express');
const {
    getCategoryValidator,
    createCategoryValidator,
    updateCategoryValidator,
    deleteCategoryValidator,
  }=require('../utils/validators/categoryValidator')

const {
  getcategories,
  createcategory,
  getcategory,
  updatecategory,
  deletecategory
}=require ('../services/categoryservice');

const subcategoriesRoute=require('./subcategoryroute');

const router=express.Router();



router.use('/:categoryId/subcategories',subcategoriesRoute);
router.route('/')
.get(getcategories)
.post(createCategoryValidator,createcategory);

router.route('/:id')
.get(getCategoryValidator, getcategory)
.put(updateCategoryValidator,updatecategory)
.delete(deleteCategoryValidator,deletecategory);
module.exports=router;