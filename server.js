const express = require('express');
const dotenv=require('dotenv');
const morgan=require('morgan');


dotenv.config({path:'config.env'});
const dbconnection=require ('./config/database');
const categoryroute=require ('./routes/categoryroute');

//connect with db
dbconnection();

// express app
const app =express();
// middlewares
app.use(express.json());

if(process.env.NODE_ENV=='development')
{
    app.use(morgan('dev'));
    console.log(`mode: ${process.env.NODE_ENV}`);
}

//\\\\\\\\\\\\\\\\\\\ routes \\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.use('/api/v1/categories',categoryroute);


const PORT= process.env.PORT || 8000;
app.listen(PORT,()=>{
    console.log(`listen is correct on ${PORT}`);
});
