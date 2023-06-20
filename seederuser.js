const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const faker = require("faker");
const User = require("./models/userModel"); // Assuming the User model is defined in a separate file

// Generate an Egyptian phone number
function generateEgyptianNumber() {
  const randomNumber = faker.datatype.number({
    min: 100000000,
    max: 999999999,
  });
  return `+201${randomNumber}`;
}
// Generate fake user data
const generateUserData = () => {
  const userData = {
    name: faker.name.findName(),
    // slug: faker.lorem.slug(),
    email: faker.internet.email(),
    phone: generateEgyptianNumber(),
    profileImg: faker.internet.avatar(),
    password: "123456",
    role: "user",
    active: faker.random.arrayElement([true, false]),
    wishlist: [],
    addresses: [],
  };

  // Generate wishlist (array of product IDs)
  const numWishlistItems = faker.datatype.number({ min: 0, max: 5 });
  for (let i = 0; i < numWishlistItems; i++) {
    userData.wishlist.push(mongoose.Types.ObjectId());
  }

  // Generate addresses
  const numAddresses = faker.datatype.number({ min: 1, max: 3 });
  for (let i = 0; i < numAddresses; i++) {
    const address = {
      id: mongoose.Types.ObjectId(),
      alias: faker.random.word(),
      details: faker.address.streetAddress(),
      phone: faker.phone.phoneNumber(),
      city: faker.address.city(),
      postalCode: faker.address.zipCode(),
    };
    userData.addresses.push(address);
  }

  return userData;
};

// Generate and save fake users
const generateFakeUsers = async (numUsers) => {
  try {
    await mongoose.connect(
      "mongodb+srv://ibrahemmahmoud191272:KHagzGi0thn2U755@ecommercedb.n3msc5v.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    for (let i = 0; i < numUsers; i++) {
      const userData = generateUserData();
      const user = new User(userData);
      await user.save();
    }

    console.log(`${numUsers} fake users created successfully.`);
    mongoose.connection.close();
  } catch (error) {
    console.error("Error generating fake users:", error);
  }
};

// Call the function to generate 10 fake users
generateFakeUsers(1000);