const menProducts = require("./men_clothes_products");
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
    favoriteProducts: [
      menProducts[0]._id,
      menProducts[2]._id,
      menProducts[3]._id,
    ],
    boughtProducts: [menProducts[0]._id, menProducts[3]._id],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: "test1",
    email: "test1@email.com",
    password: bcrypt.hashSync("test1", 10),
    favoriteProducts: [
      menProducts[3]._id,
      menProducts[1]._id,
      menProducts[5]._id,
    ],
    boughtProducts: [menProducts[3]._id, menProducts[1]._id],
  },
];
