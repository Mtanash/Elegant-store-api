const Order = require("../models/order");

const getAllOrders = async (req, res) => {
  const orders = await Order.find({});
  res.json(orders);
};

const getOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: "No order found" });
  res.json(order);
};

const createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.json(newOrder);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const deleteOrder = async (req, res) => {
  const deletedOrder = Order.findByIdAndDelete(req.params.id);
  if (!deletedOrder) return res.status(404).json({ message: "No order found" });
  res.send("Deleted!");
};

module.exports = { getAllOrders, getOrder, createOrder, deleteOrder };
