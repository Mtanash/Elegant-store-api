const express = require("express");

const {
  getAllProducts,
  createProduct,
  deleteProduct,
  getProductsBySearch,
} = require("../controllers/product");

const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);

productsRouter.get("/search", getProductsBySearch);

productsRouter.post("/", createProduct);

productsRouter.delete("/:id", deleteProduct);

module.exports = productsRouter;
