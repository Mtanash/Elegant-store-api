const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createUser,
  getCurrentUser,
  loginUser,
  logoutUser,
  deleteUser,
  addToFavorite,
  addToBought,
  removeFromFavorite,
  addAvatar,
  getFavoriteProducts,
  getOrders,
} = require("../controllers/user");
const getRefreshToken = require("../controllers/refreshToken");

const userRouter = express.Router();

userRouter.get("/me", authMiddleware, getCurrentUser);

userRouter.get("/refresh", getRefreshToken);

userRouter.get("/me/favoriteProducts", authMiddleware, getFavoriteProducts);

userRouter.get("/me/orders", authMiddleware, getOrders);

userRouter.post("/", createUser);

userRouter.post("/login", loginUser);

userRouter.post("/logout", authMiddleware, logoutUser);

userRouter.post("/addToFavorite", authMiddleware, addToFavorite);

userRouter.post("/removeFromFavorite", authMiddleware, removeFromFavorite);

userRouter.post("/addToBought", authMiddleware, addToBought);

userRouter.post("/me/avatar", authMiddleware, addAvatar);

userRouter.delete("/", authMiddleware, deleteUser);

module.exports = userRouter;
