const mongoose = require("mongoose");

const { userOneId } = require("./users");
const { productOneId, productOneData } = require("./products");

const orderOneId = new mongoose.Types.ObjectId();
const orderOneData = {
  _id: orderOneId,
  owner: userOneId,
  products: [{ product: productOneId, quantity: 1 }],
  totalPrice: productOneData.price,
  status: "confirmed",
  info: {
    firstName: "firstName",
    lastName: "lastName",
    address: "address",
    phoneNumber: "phoneNumber",
  },
  paymentMethodInfo: {
    creditNumber: 1111111111111111,
    creditExpMonth: 11,
    creditExpYear: 11,
    creditCVC: 111,
  },
};

module.exports = { orderOneData, orderOneId };
