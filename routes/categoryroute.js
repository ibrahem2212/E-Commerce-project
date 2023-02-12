const express = require('express');

const {getcategories,createcategory,getcategory}=require ('../services/categoryservice')

const router=express.Router();

router.route('/')
.get(getcategories)
.post(createcategory);

router.route('/:id')
.get(getcategory);


module.exports=router;