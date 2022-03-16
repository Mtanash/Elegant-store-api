const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

const getDashboardData = async (req, res) => {
  try {
    const latestOrders = await Order.find({}).sort({ createdAt: -1 }).limit(5);
    res.json(latestOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getDashboardData };
