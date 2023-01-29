const categorymodel=require('../models/categorymodel');

exports.getcategories= (req,res)=>{
    const name= req.body.name;
    console.log(req.body);
    
    const newcategory = new categorymodel({name})
    newcategory.save()
    .then((doc)=>{
    res.json(doc);
    })
    .catch((err)=>{
        res.json(err);
    });
    
    };