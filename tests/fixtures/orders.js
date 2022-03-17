const mongoose = require("mongoose");

const { userOneId } = require("./users");
const { productOneId, productOneData } = require("./products");

const orderOneId = new mongoose.Types.ObjectId();
const orderOneData = {
  _id: orderOneId,
  orderOwner: userOneId,
  orderProducts: [{ product: productOneId, quantity: 1 }],
  orderTotalPrice: productOneData.price,
  orderStatus: "confirmed",
  orderInfo: {
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
