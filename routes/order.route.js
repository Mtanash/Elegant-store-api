const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  getAllOrders,
  getOrder,
  createOrder,
  deleteOrder,
} = require("../controllers/order.controller");
const adminMiddleware = require("../middleware/admin.middleware");

const orderRouter = express.Router();

orderRouter.get("/", authMiddleware, getAllOrders);

orderRouter.get("/:id", authMiddleware, getOrder);

orderRouter.post("/", authMiddleware, createOrder);

orderRouter.delete("/:id", authMiddleware, adminMiddleware, deleteOrder);

module.exports = orderRouter;
