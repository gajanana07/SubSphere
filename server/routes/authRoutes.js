const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  authWithGoogle,
} = require("../controllers/authController");

// Defines the route for local email/password registration
router.post("/register", registerUser);

// Defines the route for local email/password login
router.post("/login", loginUser);

// Defines the route for Google authentication
router.post("/google", authWithGoogle);

module.exports = router;
