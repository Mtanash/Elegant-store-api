const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const Product = require("../../models/Product");

const productOneId = new mongoose.Types.ObjectId();
const productOneData = {
  _id: productOneId,
  description: "this is a test product description",
  price: 150,
  featured: false,
  imageUrl: "",
  rating: 0,
  stock: 3,
};

const userOneId = new mongoose.Types.ObjectId();
const userOnePassword = "jDoeStrongPass";
const userOneData = {
  _id: userOneId,
  name: "John Doe",
  email: "jDoe@email.com",
  role: "user",
  favoriteProducts: [],
  boughtProducts: [],
  refreshToken: jwt.sign({ _id: userOneId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXP,
  }),
  avatar: "",
};

const setupDatabase = async () => {
  await Product.deleteMany();
  await User.deleteMany();

  await Product.create(productOneData);

  const createdUser = await new User({
    ...userOneData,
    password: await bcrypt.hash(userOnePassword, 10),
  });
  createdUser.favoriteProducts.push(productOneId);
  await createdUser.save();
};

module.exports = {
  userOneId,
  userOnePassword,
  userOneData,
  productOneId,
  productOneData,
  setupDatabase,
};
