const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: [true, "Please provide product description"],
    },
    price: {
      type: Number,
      required: [true, "Please provide product price"],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    imageUrl: {
      type: String,
    },
    stock: {
      type: Number,
      min: 0,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("product", productSchema);

module.exports = Product;
