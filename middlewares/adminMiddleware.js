const User = require("../models/User");
const jwt = require("jsonwebtoken");

const adminMiddleware = async (req, res, next) => {
  if (req.user.role !== "admin") return res.sendStatus(403);
  next();
};

module.exports = adminMiddleware;
