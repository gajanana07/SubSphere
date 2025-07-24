const User = require("../models/User");

// getSubscriptions and addSubscription
const getSubscriptions = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.subscriptions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

const addSubscription = async (req, res) => {
  const {
    serviceName,
    monthlyCost,
    nextBillDate,
    iconId,
    calendarReminderSet,
  } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newSubscription = {
      serviceName,
      monthlyCost,
      nextBillDate,
      iconId: iconId || "default",
      calendarReminderSet: calendarReminderSet || false,
    };
    user.subscriptions.push(newSubscription);
    await user.save();
    res.status(201).json(user.subscriptions);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// updateSubscription
const updateSubscription = async (req, res) => {
  const {
    serviceName,
    monthlyCost,
    nextBillDate,
    iconId,
    calendarReminderSet,
  } = req.body;
  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const sub = user.subscriptions.id(req.params.id);
    if (!sub)
      return res.status(404).json({ message: "Subscription not found" });

    sub.serviceName = serviceName || sub.serviceName;
    sub.monthlyCost = monthlyCost ?? sub.monthlyCost;
    sub.nextBillDate = nextBillDate || sub.nextBillDate;
    sub.iconId = iconId || sub.iconId;
    sub.calendarReminderSet = calendarReminderSet ?? sub.calendarReminderSet;

    await user.save();
    res.json(user.subscriptions);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// Delete a subscription
const deleteSubscription = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Use .pull() to remove the subdocument from the array by its ID
    user.subscriptions.pull({ _id: req.params.id });

    // waits for user
    await user.save();

    res.json({
      message: "Subscription removed",
      subscriptions: user.subscriptions,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

module.exports = {
  getSubscriptions,
  addSubscription,
  updateSubscription,
  deleteSubscription,
};
