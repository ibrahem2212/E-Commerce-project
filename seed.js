const mongoose = require("mongoose");
const faker = require("faker");
const Review = require("./models/reviewModel");
const Product = require("./models/productModel");
const User = require("./models/userModel");
const Category = require("./models/categoryModel");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://node-project:BOP3IRVQqZfYBiQS@nodeproject.mf7e7is.mongodb.net/ecommerce?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Generate fake data
const generateFakeData = async () => {
  try {
    //product
    const productt = await Product.find({}, "_id");
    const producrIds = productt.map((product) => product._id);
    const productresult = faker.datatype.arrayElement(producrIds);
    //user
    const userss = await User.find({}, "_id");
    const userIds = userss.map((user) => user._id);
    const userresult = faker.datatype.arrayElement(userIds);

    // Generate reviews
    const reviews = Array.from({ length: 2 }).map(() => {
      const title = faker.lorem.sentence();
      const ratings = faker.random.number({ min: 1, max: 5, precision: 0.1 });
      const user = userresult;
      const product = productresult;

      return {
        title,
        ratings,
        user,
        product,
      };
    });

    // Insert the generated reviews into the database
    await Review.insertMany(reviews);

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
