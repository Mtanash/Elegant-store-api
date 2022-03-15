const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const {
  getAllProducts,
  createProduct,
  deleteProduct,
  getProductById,
  getImageUploadUrl,
  addProductImage,
  addReview,
  getProductReviews,
  getProductRates,
  checkUserReviewedProduct,
} = require("../controllers/product");

const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);

productsRouter.get(
  "/reviews/userReviewedProduct/:id",
  authMiddleware,
  checkUserReviewedProduct
);

productsRouter.get("/reviews/:id", getProductReviews);

productsRouter.get("/rates/:id", getProductRates);

productsRouter.get("/imageUploadUrl/:productId", getImageUploadUrl);

productsRouter.get("/:id", getProductById);

productsRouter.post("/", createProduct);

productsRouter.post("/image", addProductImage);

productsRouter.post("/reviews", authMiddleware, addReview);

productsRouter.delete("/:id", deleteProduct);

module.exports = productsRouter;
