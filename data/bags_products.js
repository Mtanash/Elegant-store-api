const mongoose = require("mongoose");
const { categoriesObj } = require("../constants");

module.exports = [
  {
    _id: new mongoose.Types.ObjectId(),
    description:
      "Student Boy/Girl Backpack Anti-theft Waterproof Travel Bag Laptop Case Bag with USB Charging Port",
    price: 128,
    imageUrl: "https://m.media-amazon.com/images/I/61i7RvocsMS._AC_SX679_.jpg",
    stock: 26,
    category: categoriesObj.bags,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    description:
      "Leathario Men's Shoulder Bag Leather Men's Bag Small Messenger Bag for Men Side Satchel Crossbody Retro Briefcase Daily Work",
    price: 159,
    priceAfterDiscount: 99,
    imageUrl: "https://m.media-amazon.com/images/I/71fEoNi6TNL._AC_SX679_.jpg",
    featured: true,
    stock: 15,
    category: categoriesObj.bags,
  },
  {
    _id: new mongoose.Types.ObjectId(),
    description:
      "Fourteen-10860-Woman Handbags Crossbody Bags Casual-Mixed-Camel",
    price: 370,
    imageUrl: "https://m.media-amazon.com/images/I/41+VspV26aL._AC_.jpg",
    stock: 30,
    category: categoriesObj.bags,
  },
];
