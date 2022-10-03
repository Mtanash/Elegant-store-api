const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  createUser,
  loginUser,
  logoutUser,
  deleteUser,
  addToFavorite,
  removeFromFavorite,
  addAvatar,
  getFavoriteProducts,
  getUserOrders,
  googleAuth,
  getUserById,
} = require("../controllers/user.controller");
const getRefreshToken = require("../controllers/refreshToken");

const userRouter = express.Router();

userRouter.get("/refresh", getRefreshToken);

userRouter.get("/logout", authMiddleware, logoutUser);

userRouter.get("/:id", getUserById);

userRouter.get("/me/favoriteProducts", authMiddleware, getFavoriteProducts);

userRouter.get("/me/orders", authMiddleware, getUserOrders);

userRouter.post("/", createUser);

userRouter.post("/login", loginUser);

userRouter.post("/googleAuth", googleAuth);

userRouter.post("/addToFavorite", authMiddleware, addToFavorite);

userRouter.post("/removeFromFavorite", authMiddleware, removeFromFavorite);

userRouter.post("/me/avatar", authMiddleware, addAvatar);

userRouter.delete("/", authMiddleware, deleteUser);

module.exports = userRouter;
