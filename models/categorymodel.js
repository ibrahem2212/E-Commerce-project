const mongooge=require('mongoose');

//\\\\\\\\\\\\\\\\\\ create schema\\\\\\\\\\\\\\\\\\\\\\\

const categoryschema= new mongooge.Schema(
{
    name :{
            type:String,
            required : [true,'Category required'],
            unique: [true,'Category must be unique'],
            minlength :[3,'Too short category name'],
            maxlength :[32,'Too long category name']
        },
    slug :{
            type:String,
            lowercase:true
        },


},

{ timestamps:true }

);

    //\\\\\\\\\\\\\\\\\\ create model \\\\\\\\\\\\\\\\\\\\\\\
    
    const categorymodel= mongooge.model('category',categoryschema);
    
    module.exports=categorymodel;