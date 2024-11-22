const jwt = require("jsonwebtoken");
require("dotenv").config();
const verifyRole = (role) => {
  return (req, res, next) => {
    const cookies = req.cookies;
    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
          if (err) return res.send("error");
          if (decoded.role >= role) return next();
          return res.status(401).json({ message: "unautorized" });
        }
      );
    }
  };
};
module.exports = verifyRole;
