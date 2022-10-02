const users = require("./users");
const menProducts = require("./men_clothes_products");

module.exports = [
  {
    owner: users[1]._id,
    products: [
      {
        product: menProducts[0]._id,
        quantity: 1,
        product: menProducts[3]._id,
        quantity: 3,
      },
    ],
    totalPrice: menProducts[0].price * 1 + menProducts[3].price * 3,
    status: "delivered",
    info: {
      firstName: "Mohamed",
      lastName: "Tanash",
      address: "Damietta",
      phoneNumber: "123456789",
    },
  },
  {
    owner: users[1]._id,
    products: [{ product: menProducts[3]._id, quantity: 2 }],
    totalPrice: menProducts[3].price * 2,
    status: "delivered",
    info: {
      firstName: "Mohamed",
      lastName: "Tanash",
      address: "Damietta",
      phoneNumber: "123456789",
    },
  },
  {
    owner: users[1]._id,
    products: [
      { product: menProducts[3]._id, quantity: 1 },
      { product: menProducts[5]._id, quantity: 1 },
    ],
    totalPrice: menProducts[3].price + menProducts[5].price,
    status: "shipped",
    info: {
      firstName: "Mohamed",
      lastName: "Tanash",
      address: "Damietta",
      phoneNumber: "123456789",
    },
  },
  {
    owner: users[2]._id,
    products: [
      { product: menProducts[4]._id, quantity: 1 },
      { product: menProducts[0]._id, quantity: 1 },
      { product: menProducts[5]._id, quantity: 1 },
    ],
    totalPrice:
      menProducts[4].price + menProducts[0].price + menProducts[5].price,
    status: "shipped",
    info: {
      firstName: "Ahmed",
      lastName: "Ali",
      address: "Cairo",
      phoneNumber: "123456789",
    },
  },
];
