require("dotenv").config();
var colors = require("colors");
const Product = require("./models/product");
const connectDB = require("./db/connect");

const productsJson = require("./products.json");

const start = async () => {
  try {
    // connectDB
    await connectDB(process.env.MONGODB_CONNECTION_URL);
    await Product.deleteMany();
    console.log("Deleted old data".blue);
    await Product.create(productsJson);
    console.log("Added new data".blue);
    console.log("Database populated successfully!".green);
    process.exit(0);
  } catch (error) {
    console.log(error);
  }
};

start();
