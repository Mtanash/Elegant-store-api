const menProducts = require("./men_clothes_products");
const bagsProducts = require("./bags_products");
const watchesProducts = require("./watches_products");
const users = require("./users");
const mongoose = require("mongoose");

module.exports = [
  {
    _id: new mongoose.Types.ObjectId(),
    value: 4,
    owner: users[1]._id,
    product: menProducts[0]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    value: 5,
    owner: users[1]._id,
    product: menProducts[3]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    value: 1,
    owner: users[1]._id,
    product: bagsProducts[0]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    value: 3,
    owner: users[1]._id,
    product: watchesProducts[0]._id,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    value: 4,
    owner: users[1]._id,
    product: watchesProducts[1]._id,
  },
];
