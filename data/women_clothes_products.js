const mongoose = require("mongoose");
const { categoriesObj } = require("../constants");

module.exports = [
  {
    _id: new mongoose.Types.ObjectId(),
    description: "Pinky High Rise wide Leg Linen Pants For Women",
    price: 450,
    priceAfterDiscount: 400,
    imageUrl: "https://m.media-amazon.com/images/I/61G2nnaR5sL._AC_SX522_.jpg",
    stock: 1,
    category: categoriesObj.womenClothes,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    description: "Casual Abaya For Women",
    price: 189,
    imageUrl: "https://m.media-amazon.com/images/I/616nVGKNBtL._AC_UL320_.jpg",
    stock: 7,
    category: categoriesObj.womenClothes,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    description: "Religion Prayer Dress For Women",
    price: 250,
    imageUrl: "https://m.media-amazon.com/images/I/51rjnrK78PL._AC_UL320_.jpg",
    stock: 3,
    category: categoriesObj.womenClothes,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    description: "Viscose Prayer Dropping with Attached Veil in Multicolor",
    price: 275,
    imageUrl: "https://m.media-amazon.com/images/I/416wOidp7uL._AC_UL320_.jpg",
    stock: 12,
    category: categoriesObj.womenClothes,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    description: "Abaya Casual ",
    price: 249,
    imageUrl: "https://m.media-amazon.com/images/I/61xxewIl9cL._AC_UL320_.jpg",
    stock: 2,
    category: categoriesObj.womenClothes,
  },
];
