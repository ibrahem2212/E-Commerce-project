const mongoose=require('mongoose');

const productschema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,"Too short product title"],
        maxlength:[100,"Too long product title"]
    },
    slug:{
        type:String,
        required:true,
        lowerCase:true
    },
    description: {
        type: String,
        required: [true, 'Product description is required'],
        minlength: [20, 'Too short product description'],
      },
      quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
      },
      sold: {
        type: Number,
        default: 0,
      },
      price:{
        type:Number,
        required:[true,'Product price is required'],
        trim:true,
        max:[20,'Too long product price']
      },
      priceAfterDiscount: {
        type: Number,
      },
      colors: [String],
      images:[String],
      imageCover:{
        type:String,
        required:[true,'Product imageCover is required']
      },
      category:{
        type:String,
        ref:'category',
        required:[true,'Product must be belong to category']
      },
      subcategory:[
        {
        type:mongoose.Schema.objectId,
        ref:'subcategory',
      },
    ],
      brand:{
        type:mongoose.Schema.objectId,
        ref:'brand'
      },
      ratingsAvarage:{
        type:Number,
        min:[1,"rating must be above or equal 1.0"],
        max:[5,"rating must be below or equal 5.0"],
      },
      ratingsQuantity: {
        type: Number,
        default: 0,
      },
}
,{timestamps:true})

module.exports=mongoose.model('product',productschema);