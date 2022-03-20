const bcrypt = require("bcrypt");
const User = require("../../models/User");
const Product = require("../../models/Product");
const Order = require("../../models/Order");

const {
  productOneData,
  productOneId,
  productTwoData,
  productThreeData,
} = require("./products");
const {
  userOneData,
  userOnePassword,
  adminUserData,
  adminUserPassword,
} = require("./users");
const { orderOneData } = require("./orders");

const setupDatabase = async () => {
  await Product.deleteMany();
  await User.deleteMany();
  await Order.deleteMany();

  await Product.create([productOneData, productTwoData, productThreeData]);

  const createdUser = await new User({
    ...userOneData,
    password: await bcrypt.hash(userOnePassword, 10),
  });
  createdUser.favoriteProducts.push(productOneId);
  await createdUser.save();

  const createdAdminUser = await new User({
    ...adminUserData,
    password: await bcrypt.hash(adminUserPassword, 10),
  });
  await createdAdminUser.save();

  await Order.create(orderOneData);
};

module.exports = { setupDatabase };
