const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          min: 1,
        },
      },
    ],
    totalPrice: Number,
    status: {
      type: String,
      enum: ["confirmed", "shipped", "delivered"],
      default: "confirmed",
    },
    info: {
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
