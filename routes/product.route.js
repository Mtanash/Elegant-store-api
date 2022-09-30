const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const multer = require("multer");
const upload = multer();
const {
  getAllProducts,
  createProduct,
  deleteProduct,
  getProductById,
  addReview,
  getProductReviews,
  getProductRates,
  checkUserReviewedProduct,
  updateProduct,
} = require("../controllers/product.controller");

const productsRouter = express.Router();

productsRouter.get("/", getAllProducts);

productsRouter.get(
  "/reviews/userReviewedProduct/:id",
  authMiddleware,
  checkUserReviewedProduct
);

productsRouter.get("/reviews/:id", getProductReviews);

productsRouter.get("/rates/:id", getProductRates);

productsRouter.get("/:id", getProductById);

productsRouter.post(
  "/",
  authMiddleware,
  adminMiddleware,
  upload.single("productImage"),
  createProduct
);

productsRouter.post("/reviews", authMiddleware, addReview);

productsRouter.delete("/:id", authMiddleware, adminMiddleware, deleteProduct);

productsRouter.patch("/:id", authMiddleware, adminMiddleware, updateProduct);

module.exports = productsRouter;
