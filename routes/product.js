const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");

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

productsRouter.get(
  "/imageUploadUrl/:productId",
  authMiddleware,
  adminMiddleware,
  getImageUploadUrl
);

productsRouter.get("/:id", getProductById);

productsRouter.post("/", authMiddleware, adminMiddleware, createProduct);

productsRouter.post("/image", authMiddleware, adminMiddleware, addProductImage);

productsRouter.post("/reviews", authMiddleware, addReview);

productsRouter.delete("/:id", deleteProduct);

module.exports = productsRouter;
