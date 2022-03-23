const products = require("./products");
const users = require("./users");
const mongoose = require("mongoose");

module.exports = [
  {
    _id: new mongoose.Types.ObjectId(),
    value: 4,
    owner: users[1]._id,
    product: products[0]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    value: 5,
    owner: users[1]._id,
    product: products[3]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    value: 1,
    owner: users[1]._id,
    product: products[5]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    value: 3,
    owner: users[1]._id,
    product: products[2]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    value: 4,
    owner: users[1]._id,
    product: products[8]._id,
  },
];
