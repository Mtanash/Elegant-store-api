const express = require("express");

const {
  getAllProducts,
  createProduct,
  deleteProduct,
  getProductsBySearch,
  getProductById,
} = require("../controllers/product");

const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);

productsRouter.get("/search", getProductsBySearch);

productsRouter.get("/:id", getProductById);

productsRouter.post("/", createProduct);

productsRouter.delete("/:id", deleteProduct);

module.exports = productsRouter;
