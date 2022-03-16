const products = require("./products.js");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

module.exports = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: "Admin",
    email: "admin@email.com",
    password: bcrypt.hashSync("admin", 10),
    role: "admin",
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "mohamed",
    email: "mohamed@email.com",
    password: bcrypt.hashSync("123", 10),
    favoriteProducts: [products[0]._id, products[2]._id, products[3]._id],
    boughtProducts: [products[0]._id, products[3]._id],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "test1",
    email: "test1@email.com",
    password: bcrypt.hashSync("test1", 10),
    favoriteProducts: [products[7]._id, products[1]._id, products[12]._id],
    boughtProducts: [products[3]._id, products[4]._id],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "test2",
    email: "test2@email.com",
    password: bcrypt.hashSync("test2", 10),
    favoriteProducts: [
      products[15]._id,
      products[2]._id,
      products[11]._id,
      products[13]._id,
    ],
    boughtProducts: [products[15]._id, products[2]._id, products[6]._id],
  },
];
