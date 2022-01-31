const express = require("express");
const Order = require("../models/order");

const {
  getAllOrders,
  getOrder,
  createOrder,
  deleteOrder,
} = require("../controllers/order");

const orderRouter = express.Router();

orderRouter.get("/", getAllOrders);

orderRouter.get("/:id", getOrder);

orderRouter.post("/", createOrder);

orderRouter.delete("/:id", deleteOrder);

module.exports = orderRouter;
