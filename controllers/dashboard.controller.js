const User = require("../models/user.model");
const Order = require("../models/order.model");
const Product = require("../models/product.model");

const getDashboardData = async (_req, res, next) => {
  try {
    const latestOrders = await Order.find({}).sort({ createdAt: -1 }).limit(5);
    res.json(latestOrders);
  } catch (error) {
    next(error);
  }
};

module.exports = { getDashboardData };
