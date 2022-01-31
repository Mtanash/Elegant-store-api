const express = require("express");

const {
  getAllProducts,
  createProduct,
  deleteProduct,
} = require("../controllers/product");

const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);

productsRouter.post("/", createProduct);

productsRouter.delete("/:id", deleteProduct);

module.exports = productsRouter;
