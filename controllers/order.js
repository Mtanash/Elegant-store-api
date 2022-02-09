const Order = require("../models/order");

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({});
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "No order found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const newOrder = new Order({ ...req.body, orderOwner: req.user._id });
    if (!newOrder)
      return res.status(400).json({ message: "Something went wrong" });
    await newOrder.save();
    res.json(newOrder);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = Order.findByIdAndDelete(req.params.id);
    if (!deletedOrder)
      return res.status(404).json({ message: "No order found" });
    res.json({ message: "order deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAllOrders, getOrder, createOrder, deleteOrder };
