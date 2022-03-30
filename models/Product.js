const mongoose = require("mongoose");
const { categories } = require("../constants");

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
    priceAfterDiscount: {
      type: Number,
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
    category: {
      type: String,
      enum: categories,
    },
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

productSchema.virtual("rates", {
  ref: "rate",
  localField: "_id",
  foreignField: "product",
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;
