const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const {
  getAllOrders,
  getOrder,
  createOrder,
  deleteOrder,
} = require("../controllers/order.controller");

const orderRouter = express.Router();

orderRouter.get("/", getAllOrders);

orderRouter.get("/:id", getOrder);

orderRouter.post("/", authMiddleware, createOrder);

orderRouter.delete("/:id", deleteOrder);

module.exports = orderRouter;
