const express = require('express');
const {
    getBrandValidator,
    createBrandValidator,
    updateBrandValidator,
    deleteBrandValidator,
  }=require('../utils/validators/brandValidator')

const {
  getbrands,
  createbrand,
  getbrand,
  updatebrand,
  deletebrand
}=require ('../services/brandservice');

// const subcategoriesRoute=require('./subcategoryroute');

const router=express.Router();

// router.use('/:categoryId/subcategories',subcategoriesRoute);

router.route('/')
.get(getbrands)
.post(createBrandValidator,createbrand);

router.route('/:id')
.get(getBrandValidator, getbrand)
.put(updateBrandValidator,updatebrand)
.delete(deleteBrandValidator,deletebrand);
module.exports=router;