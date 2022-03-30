const mongoose = require("mongoose");
const { categoriesObj } = require("../constants");

module.exports = [
  {
    _id: new mongoose.Types.ObjectId(),
    description: "Rimini 2450 Canvas Lace-Up Casual Shoes for Men",
    price: 129,
    imageUrl: "https://m.media-amazon.com/images/I/41IsxxIJYhL._AC_SY500_.jpg",
    stock: 3,
    category: categoriesObj.shoes,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    description:
      "Salerno Printed Front Logo Contrast Sole Slip-on Shoes for Men",
    price: 109,
    imageUrl: "https://m.media-amazon.com/images/I/51hONNMVf5L._AC_SX500_.jpg",
    stock: 12,
    category: categoriesObj.shoes,
  },
];
