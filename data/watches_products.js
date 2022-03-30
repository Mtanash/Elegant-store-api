const mongoose = require("mongoose");
const { categoriesObj } = require("../constants");

module.exports = [
  {
    _id: new mongoose.Types.ObjectId(),
    description: "Tommy Hilfiger Men's Blue Dial Rubber Band Watch - 1791476",
    price: 1690,
    priceAfterDiscount: 1599,
    imageUrl: "https://m.media-amazon.com/images/I/81RLOEiItwL._AC_SY445_.jpg",
    stock: 29,
    category: categoriesObj.watches,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    description:
      "Tommy Hilfiger Trent For Men Blue Dial Stainless Steel Band Chronograph Watch - 1791053",
    price: 1430,
    imageUrl: "https://m.media-amazon.com/images/I/61mguTD2nuL._AC_SY445_.jpg",
    stock: 8,
    category: categoriesObj.watches,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    description:
      "Casio Women'S Black Dial Leather Band Watch Ltp V005L 1Budf, Analog",
    price: 520,
    imageUrl: "https://m.media-amazon.com/images/I/71Ge+14lMTL._AC_SY445_.jpg",
    stock: 3,
    category: categoriesObj.watches,
  },
];
