const users = require("./users");
const menProducts = require("./men_clothes_products");

module.exports = [
  {
    orderOwner: users[1]._id,
    orderProducts: [
      {
        product: menProducts[0]._id,
        quantity: 1,
        product: menProducts[3]._id,
        quantity: 3,
      },
    ],
    orderTotalPrice: menProducts[0].price * 1 + menProducts[3].price * 3,
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
    orderProducts: [{ product: menProducts[3]._id, quantity: 2 }],
    orderTotalPrice: menProducts[3].price * 2,
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
      { product: menProducts[3]._id, quantity: 1 },
      { product: menProducts[5]._id, quantity: 1 },
    ],
    orderTotalPrice: menProducts[3].price + menProducts[5].price,
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
      { product: menProducts[4]._id, quantity: 1 },
      { product: menProducts[0]._id, quantity: 1 },
      { product: menProducts[5]._id, quantity: 1 },
    ],
    orderTotalPrice:
      menProducts[4].price + menProducts[0].price + menProducts[5].price,
    orderStatus: "shipped",
    orderInfo: {
      firstName: "Ahmed",
      lastName: "Ali",
      address: "Cairo",
      phoneNumber: "123456789",
    },
  },
];
