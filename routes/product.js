const express = require("express");

const {
  getAllProducts,
  createProduct,
  deleteProduct,
  getProductById,
  getImageUploadUrl,
  addProductImage,
} = require("../controllers/product");

const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);

productsRouter.get("/imageUploadUrl/:productId", getImageUploadUrl);

productsRouter.get("/:id", getProductById);

productsRouter.post("/", createProduct);

productsRouter.post("/image", addProductImage);

productsRouter.delete("/:id", deleteProduct);

module.exports = productsRouter;
