const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const { OAuth2Client } = require("google-auth-library");

// Initialize the Google Auth client with your Client ID from the .env file
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Register a new user
// POST /api/auth/register
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      authMethod: "local",
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Authenticate user & get token
// POST /api/auth/login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (
      user &&
      user.authMethod === "local" &&
      (await user.comparePassword(password))
    ) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Authenticate with Google
// POST /api/auth/google
const authWithGoogle = async (req, res) => {
  const { credential } = req.body; // The token from Google sent by the frontend

  try {
    // 1. Verify the Google token using Google's library
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { sub: googleId, email, name } = payload;

    // 2. Check if a user with this Google ID already exists in your database
    let user = await User.findOne({ googleId });

    if (user) {
      // If the user exists, generate a token and log them in
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      // 3. If the user doesn't exist, check if their email is already used by another account
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        // If the email is taken, return an error
        return res.status(400).json({
          message:
            "Email already in use with a different authentication method.",
        });
      }

      // 4. If everything is clear, create a new user in your database
      user = await User.create({
        googleId,
        name,
        email,
        authMethod: "google",
      });

      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ message: "Google authentication failed", error: error.message });
  }
};

module.exports = { registerUser, loginUser, authWithGoogle };
