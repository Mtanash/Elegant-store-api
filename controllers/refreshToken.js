const jwt = require("jsonwebtoken");
const User = require("../models/User");

const getRefreshToken = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    async (err, decoded) => {
      if (err) return res.sendStatus(403);

      const user = await User.findOne({
        _id: decoded._id,
        refreshToken,
      }).exec();

      if (!user) return res.sendStatus(403);
      const accessToken = user.generateAccessToken();
      res.json({ accessToken });
    }
  );
};

module.exports = getRefreshToken;
