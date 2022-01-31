const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderOwner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
    },
    orderProducts: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "product",
      },
    ],
    orderTotalPrice: Number,
    orderStatus: {
      type: String,
      enum: ["confirmed", "shipped", "arrived"],
    },
    orderInfo: {
      firstName: String,
      lastName: String,
      address: String,
      phoneNumber: String,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("order", orderSchema, "order");

module.exports = Order;
