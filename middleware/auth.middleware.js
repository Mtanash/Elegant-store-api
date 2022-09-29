const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  const accessToken = authorizationHeader && authorizationHeader.split(" ")[1];

  if (accessToken === "undefined") {
    return res.status(401).json({ message: "Please authenticate" });
  }

  jwt.verify(
    accessToken,
    process.env.JWT_ACCESS_SECRET,
    async (err, decoded) => {
      if (err) {
        if (err?.message === "jwt expired")
          return res.status(403).json({ message: "Please authenticate" });
        else return res.status(401).json({ message: "Invalid token" });
      }

      const user = await User.findOne({
        _id: decoded._id,
      });

      if (!user)
        return res.status(401).json({ message: "Please authenticate" });

      req.user = user;

      next();
    }
  );
};

module.exports = authMiddleware;
