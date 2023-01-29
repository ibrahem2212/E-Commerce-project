const mongooge=require('mongoose');

//\\\\\\\\\\\\\\\\\\ create schema\\\\\\\\\\\\\\\\\\\\\\\

const categoryschema= new mongooge.Schema({
    name :String,
    });

    //\\\\\\\\\\\\\\\\\\ create model \\\\\\\\\\\\\\\\\\\\\\\
    
    const categorymodel= mongooge.model('category',categoryschema);
    
    module.exports=categorymodel;