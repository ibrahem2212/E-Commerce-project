const express = require('express');

const {getcategories}=require ('../services/categoryservice')

const router=express.Router();

router.get('/',getcategories);


module.exports=router;