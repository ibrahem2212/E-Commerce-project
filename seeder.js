const faker = require("faker");
const slugify = require("slugify");
const mongoose = require("mongoose");
const Category = require("./models/categoryModel");
const SubCategory = require("./models/subCategoryModel");
const Brand = require("./models/brandModel");
const productModel = require("./models/productModel");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://node-project:BOP3IRVQqZfYBiQS@nodeproject.mf7e7is.mongodb.net/ecommerce?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

// Generate fake data
const generateFakeData = async () => {
  try {
    // Get a list of category IDs
    // const categories = await Category.find({}, "_id");
    // const categoryIds = categories.map((category) => category._id);
    //subcategory
    const subcategorie = await SubCategory.find({}, "_id");
    const subcategoriesIds = subcategorie.map((subcategory) => subcategory._id);
    const subresult = faker.random.arrayElement(subcategoriesIds);
    //category
    const categories = await SubCategory.find({ _id: subresult }, "category");
    const categoriesIds = categories.map((category) => category.category);

    const result = faker.random.arrayElement(categoriesIds);
    //brand
    const brands = await Brand.find({}, "_id");
    const brandsIds = brands.map((brand) => brand._id);

    // Generate subcategories with random category references
    const products = Array.from({ length: 5 }).map(() => {
      const productname = faker.commerce.productName();
      const slugy = slugify(productname, { lower: true });
      const title = productname;
      const slug = slugy;
      const description = faker.lorem.paragraph();
      const quantity = faker.datatype.number();
      const sold = faker.datatype.number();
      const price = faker.commerce.price();
      const priceAfterDiscount = faker.commerce.price();
      const colors = [faker.commerce.color(), faker.commerce.color()];
      const imageCover = faker.image.imageUrl();
      const images = [faker.image.imageUrl(), faker.image.imageUrl()];
      const category = result;
      const subcategories = subresult;
      const brand = faker.random.arrayElement(brandsIds);
      const ratingsAverag = faker.datatype.number({
        min: 1,
        max: 5,
        precision: 0.1,
      });
      const ratingsQuantity = faker.datatype.number();

      //---------------------------------------------
      // Generate fake data for product
      return {
        title,
        slug,
        description,
        quantity,
        sold,
        price,
        priceAfterDiscount,
        colors,
        imageCover,
        images,
        category,
        subcategories,
        brand,
        ratingsAverag,
        ratingsQuantity,
      };
    });

    // Insert the generated subcategories into the database
    await productModel.insertMany(products);

    console.log("Fake data generated successfully.");
  } catch (error) {
    console.error("Error generating fake data:", error);
  } finally {
    // Disconnect from MongoDB
    mongoose.disconnect();
  }
};

// Call the function to generate fake data
generateFakeData();
