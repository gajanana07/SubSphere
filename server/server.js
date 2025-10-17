const express = require("express"); //it simplifies building http apis compared to using the built in http module 
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

// Import routes
const authRoutes = require("./routes/authRoutes");
const subscriptionRoutes = require("./routes/subscriptionRoutes");

// Load environment variables from .env file
dotenv.config();

const app = express(); //start server

// Middleware
//app.use(cors({ origin: "https://subsphere.netlify.app" }));
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Database Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

// All routes
app.use("/api/auth", authRoutes);
app.use("/api/subscriptions", subscriptionRoutes);

// Server starts
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
