require("dotenv").config();
var colors = require("colors");
const Product = require("./models/Product");
const User = require("./models/User");
const Order = require("./models/Order");
const Rate = require("./models/Rate");
const Review = require("./models/Review");
const connectDB = require("./db/connect");

const productsData = require("./data/products.js");
const usersData = require("./data/users.js");
const ordersData = require("./data/orders.js");
const ratesData = require("./data/rates.js");
const reviewsData = require("./data/reviews.js");

const start = async () => {
  try {
    // connectDB
    connectDB(process.env.MONGODB_CONNECTION_URL);

    // delete old data
    await Product.deleteMany();
    console.log("Deleted old products data".blue);
    await User.deleteMany();
    console.log("Deleted old users data".blue);
    await Order.deleteMany();
    console.log("Deleted old orders data".blue);
    await Rate.deleteMany();
    console.log("Deleted old rates data".blue);
    await Review.deleteMany();
    console.log("Deleted old reviews data".blue);

    // create new data
    await Product.create(productsData);
    console.log("Added new products data".blue);
    await User.create(usersData);
    console.log("Added new users data".blue);
    await Order.create(ordersData);
    console.log("Added new orders data".blue);
    await Rate.create(ratesData);
    console.log("Added new rates data".blue);
    await Review.create(reviewsData);
    console.log("Added new reviews data".blue);

    console.log("Database populated successfully!".green);
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

start();
