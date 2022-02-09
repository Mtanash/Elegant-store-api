const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    orderOwner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
    orderProducts: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "product",
        required: true,
      },
    ],
    orderTotalPrice: Number,
    orderStatus: {
      type: String,
      enum: ["confirmed", "shipped", "arrived"],
      default: "confirmed",
    },
    orderInfo: {
      firstName: String,
      lastName: String,
      address: String,
      phoneNumber: String,
    },
    paymentMethodInfo: {
      creditNumber: Number,
      creditExpMonth: Number,
      creditExpYear: Number,
      creditCVC: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("order", orderSchema);

module.exports = Order;
