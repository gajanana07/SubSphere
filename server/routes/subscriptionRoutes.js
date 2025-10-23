const express = require("express");
const router = express.Router();
const {
  getSubscriptions,
  addSubscription,
  updateSubscription,
  deleteSubscription,
} = require("../controllers/subscriptionController");
const { protect } = require("../middleware/authMiddleware");

// All these routes are protected by the 'protect' middleware.
// A user must be logged in to access them.

// Route for getting all subscriptions and adding a new one
router.get("/", protect, getSubscriptions);
router.post("/", protect, addSubscription);

// Route for updating and deleting a specific subscription by its ID
router.put("/:id", protect, updateSubscription);
router.delete("/:id", protect, deleteSubscription);

module.exports = router;
