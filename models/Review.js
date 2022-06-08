const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    product: { type: mongoose.SchemaTypes.ObjectId, ref: "product" },
    text: { type: String, required: true },
    owner: { type: mongoose.SchemaTypes.ObjectId, ref: "user" },
    rate: { type: mongoose.SchemaTypes.ObjectId, ref: "rate" },
    confirmed: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("review", reviewSchema);

module.exports = Review;
