const mongoose = require("mongoose");

const productOneId = new mongoose.Types.ObjectId();
const productOneData = {
  _id: productOneId,
  description: "this is a test product one description",
  price: 150,
  featured: false,
  imageUrl: "",
  stock: 3,
};

const productTwoId = new mongoose.Types.ObjectId();
const productTwoData = {
  _id: productTwoId,
  description: "this is a test product two description",
  price: 120,
  featured: false,
  imageUrl: "",
  stock: 1,
};

const productThreeId = new mongoose.Types.ObjectId();
const productThreeData = {
  _id: productThreeId,
  description: "this is a test product three description",
  price: 620,
  featured: false,
  imageUrl: "",
  stock: 14,
};

module.exports = {
  productOneId,
  productOneData,
  productTwoId,
  productTwoData,
  productThreeId,
  productThreeData,
};
