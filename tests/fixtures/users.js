const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const userOneId = new mongoose.Types.ObjectId();
const userOnePassword = "jDoeStrongPass";
const userOneData = {
  _id: userOneId,
  name: "John Doe",
  email: "jDoe@email.com",
  role: "user",
  favoriteProducts: [],
  boughtProducts: [],
  refreshToken: jwt.sign({ _id: userOneId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXP,
  }),
  avatar: "",
};

module.exports = { userOneData, userOnePassword, userOneId };
