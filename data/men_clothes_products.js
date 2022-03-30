const mongoose = require("mongoose");
const { categoriesObj } = require("../constants");

module.exports = [
  {
    _id: new mongoose.Types.ObjectId(),
    description: "Firewood Jogger Trousers",
    price: 200,
    priceAfterDiscount: 159,
    imageUrl: "https://m.media-amazon.com/images/I/312bTJbQz-L._AC_.jpg",
    featured: true,
    stock: 7,
    category: categoriesObj.menClothes,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    description:
      "Off Cliff Mens Cotton Contrast Side Stripe Drawstring Slim Fit Pant",
    price: 125,
    priceAfterDiscount: 120,
    imageUrl: "https://m.media-amazon.com/images/I/71+abNBuoES._AC_SX679_.jpg",
    stock: 60,
    category: categoriesObj.menClothes,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    description: "T-Shirts Round Neck Cotton Full Sleeve - Black",
    price: 90,
    imageUrl: "https://m.media-amazon.com/images/I/51r6OSa6kBL._AC_SX679_.jpg",
    stock: 16,
    category: categoriesObj.menClothes,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    description: "Groowii High Neck Pullover Top",
    price: 68,
    imageUrl: "https://m.media-amazon.com/images/I/41F1Bd+ITES._AC_.jpg",
    stock: 6,
    category: categoriesObj.menClothes,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    description: "Groowii Jacket waterproof with Fur inside",
    price: 230,
    imageUrl: "https://m.media-amazon.com/images/I/51cIU4-n-xL._AC_SX679_.jpg",
    featured: true,
    stock: 2,
    category: categoriesObj.menClothes,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    description: "Zip Up Hoodie",
    price: 144,
    imageUrl: "https://m.media-amazon.com/images/I/61pC96ccHRL._AC_SX679_.jpg",
    stock: 100,
    category: categoriesObj.menClothes,
  },
];
