const mongoose = require("mongoose");
const { categoriesObj } = require("../constants");

module.exports = [
  {
    _id: new mongoose.Types.ObjectId(),
    description:
      "Jaguar Men`s Classic Black Eau De Toilette Spray - 3.4 FL.OZ./ 100 Ml",
    price: 640,
    priceAfterDiscount: 370,
    imageUrl: "https://m.media-amazon.com/images/I/51O5nN0+-OL._AC_UL320_.jpg",
    stock: 4,
    category: categoriesObj.perfumes,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    description: "Boos Class perfume for Men 100ml - Gray",
    price: 104,
    imageUrl: "https://m.media-amazon.com/images/I/710VEF6MMwL._AC_UL320_.jpg",
    stock: 2,
    category: categoriesObj.perfumes,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    description: "Guess Pink by Guess for Women - Eau de Parfum, 75ml",
    price: 170,
    imageUrl: "https://m.media-amazon.com/images/I/51GvU7DqJfL._AC_UL320_.jpg",
    stock: 10,
    category: categoriesObj.perfumes,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    description: "Guess Seductive Homme for Men - Eau de Toilette, 100ml",
    price: 800,
    priceAfterDiscount: 465,
    imageUrl: "https://m.media-amazon.com/images/I/61G205BA8ML._AC_UL320_.jpg",
    stock: 10,
    category: categoriesObj.perfumes,
    featured: true,
  },
];
