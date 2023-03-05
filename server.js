const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");

dotenv.config({ path: "config.env" });
const dbconnection = require("./config/database");
const categoryroute = require("./routes/categoryroute");
const subcategoryroute = require('./routes/subcategoryroute');
const brandroute = require("./routes/brandroute");
const productroute =require('./routes/productroute');
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorMiddleware");
//connect with db
dbconnection();

// express app
const app = express();
// middlewares
app.use(express.json());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

//mount routes \\\\\\\\\\\\\\\\\\\\\\\\\\\\\
app.use("/api/v1/categories", categoryroute);
app.use("/api/v1/subcategories", subcategoryroute);
app.use("/api/v1/brands",brandroute);
app.use("/api/v1/products",productroute);
app.all("*", (req, res, next) => {
  // const err = new Error(`Cant find the route: ${req.originalUrl}`);
  // next(err.message);
  next(new ApiError(`Cant find the route: ${req.originalUrl}`, 400));
});

//handling error inside express
app.use(globalError);

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`listen is correct on ${PORT}`);
});

//handling error outside express
// /////////////////////////////////////////////////////////
process.on("unhandledRejection", (err) => {
  console.error(`unhandledRejection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down...`);
    process.exit(1);
  });
});
