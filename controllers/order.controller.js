const Order = require("../models/order.model");
const mongoose = require("mongoose");

const getAllOrders = async (_req, res, next) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

const getOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(orderId))
      return res.status(400).json({ message: "Please provide a valid id!" });

    const order = await Order.findById(orderId).populate("products.product");

    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const orderProducts = req.body.orderProducts;
    const newOrder = new Order({ ...req.body, owner: req.user._id });

    await newOrder.save();

    // add products in order to user bought products
    orderProducts.forEach((product) => {
      if (req.user.boughtProducts.includes(product._id)) return;
      req.user.boughtProducts.push(product._id);
    });

    await req.user.save();
    res.json(newOrder);
  } catch (error) {
    next(error);
  }
};

const deleteOrder = async (req, res, next) => {
  try {
    const orderId = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(orderId))
      return res.status(400).json({ message: "Please provide a valid id!" });

    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder)
      return res.status(404).json({ message: "Order not found" });

    res.json({ message: "order deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllOrders,
  getOrder,
  createOrder,
  deleteOrder,
};
