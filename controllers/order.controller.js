const Order = require("../models/order.model");

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
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "No order found" });
    res.json(order);
  } catch (error) {
    next(error);
  }
};

const createOrder = async (req, res, next) => {
  try {
    const orderProducts = req.body.orderProducts;
    const newOrder = new Order({ ...req.body, orderOwner: req.user._id });

    await newOrder.save();
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
    const deletedOrder = Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder)
      return res.status(404).json({ message: "No order found" });
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
