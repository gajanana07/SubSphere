const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  // Check if the request header has a valid authorization token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header (e.g., "Bearer eyJhbGci...")
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using our secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find the user by the ID from the token and attach them to the request object
      // We exclude the password from being attached
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        // If user is not found (e.g., deleted), deny access
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      // If everything is successful, move on to the next step (the actual route logic)
      next();
    } catch (error) {
      res.status(401).json({ message: "Not authorized, token failed" });
    }
  } else {
    // If there's no token at all, deny access
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = { protect };
