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
router.route("/").get(protect, getSubscriptions).post(protect, addSubscription);

// Route for updating and deleting a specific subscription by its ID
router
  .route("/:id")
  .put(protect, updateSubscription)
  .delete(protect, deleteSubscription);

module.exports = router;
