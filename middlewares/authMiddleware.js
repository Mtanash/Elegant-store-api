const User = require("../models/user");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  const token = authorizationHeader && authorizationHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_ACCESS_KEY, async (err, decoded) => {
    if (err) return res.status(401).json({ message: "Please authenticate" });

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) return res.status(401).json({ message: "Please authenticate" });

    req.user = user;
    req.token = token;

    next();
  });
};

module.exports = authMiddleware;
