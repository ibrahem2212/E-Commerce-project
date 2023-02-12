const slugify=require('slugify');
const asyncHandler = require('express-async-handler')
const categorymodel=require('../models/categorymodel');
//------------------------//--------------------------------//
// @desc      get list of categories
// @route     get  /api/v1/categories
// @access    public
exports.getcategories= asyncHandler(async(req,res)=>{
    const page=req.query.page||1;
    const limit=req.query.limit||4;
    const skip=(page-1)*limit;

    const categories  = await categorymodel.find({}).skip(skip).limit(limit);
        res.status(200).json({results:categories.length,page, data:categories});
       });

    //---------------------//----------------------------------//
// @desc      create category
// @route     post  /api/v1/categories
// @access    private
exports.createcategory = asyncHandler( async(req,res)=>{
    const name = req.body.name;
    const category = await categorymodel.create({ name , slug: slugify(name) })
    res.status(201).json({data:category});
    })

    // @desc      create category
// @route     post  /api/v1/categories
// @access    private
exports.getcategory=asyncHandler(async(req,res)=>{
    const id=req.params.id;
    const category= await categorymodel.findById(id);
    if(!category)
    {
    res.status(404).json({msg:`no category for this id ${id}`});
    }
    res.status(200).json({data:category});
})