const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    sizes: {
      type: [String],
    },
    imageUrl: {
      type: String,
      default: "https://via.placeholder.com/200",
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
