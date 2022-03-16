const users = require("./users");
const products = require("./products");

module.exports = [
  {
    orderOwner: users[1]._id,
    orderProducts: [
      {
        product: products[0]._id,
        quantity: 1,
        product: products[3]._id,
        quantity: 3,
      },
    ],
    orderTotalPrice: products[0].price * 1 + products[3].price * 3,
    orderStatus: "delivered",
    orderInfo: {
      firstName: "Mohamed",
      lastName: "Tanash",
      address: "Damietta",
      phoneNumber: "123456789",
    },
  },
  {
    orderOwner: users[1]._id,
    orderProducts: [{ product: products[3]._id, quantity: 2 }],
    orderTotalPrice: products[3].price * 2,
    orderStatus: "delivered",
    orderInfo: {
      firstName: "Mohamed",
      lastName: "Tanash",
      address: "Damietta",
      phoneNumber: "123456789",
    },
  },
  {
    orderOwner: users[1]._id,
    orderProducts: [
      { product: products[6]._id, quantity: 1 },
      { product: products[10]._id, quantity: 1 },
    ],
    orderTotalPrice: products[6].price + products[10].price,
    orderStatus: "shipped",
    orderInfo: {
      firstName: "Mohamed",
      lastName: "Tanash",
      address: "Damietta",
      phoneNumber: "123456789",
    },
  },
  {
    orderOwner: users[2]._id,
    orderProducts: [
      { product: products[14]._id, quantity: 1 },
      { product: products[13]._id, quantity: 1 },
      { product: products[5]._id, quantity: 1 },
    ],
    orderTotalPrice:
      products[14].price + products[13].price + products[5].price,
    orderStatus: "shipped",
    orderInfo: {
      firstName: "Ahmed",
      lastName: "Ali",
      address: "Cairo",
      phoneNumber: "123456789",
    },
  },
  {
    orderOwner: users[3]._id,
    orderProducts: [
      { product: products[2]._id, quantity: 1 },
      { product: products[0]._id, quantity: 2 },
    ],
    orderTotalPrice: products[2].price + products[0].price * 2,
    orderStatus: "confirmed",
    orderInfo: {
      firstName: "Elsayed",
      lastName: "Ibrahim",
      address: "Alexandria",
      phoneNumber: "123456789",
    },
  },
];
