// middleware/authMiddleware.js
const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);

    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: "Invalid token" });
  }
};

module.exports = verifyToken;
