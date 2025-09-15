const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

//for each subscription
const subscriptionSchema = new mongoose.Schema({
  serviceName: { type: String, required: true },
  monthlyCost: { type: Number, required: true },
  nextBillDate: { type: Date, required: true },
  iconId: { type: String, default: "default" },
  calendarReminderSet: { type: Boolean, default: false },
});

//main schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function () {
        return this.authMethod === "local";
      },
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    authMethod: {
      type: String,
      enum: ["local", "google"],
      required: true,
    },
    subscriptions: [subscriptionSchema],
  },
  {
    timestamps: true,
  }
);

//Mongoose Middleware to Hash Password Before Saving(when "save" button is pressed)
userSchema.pre("save", async function (next) {
  if (!this.isModified("password") || this.authMethod !== "local") {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to Compare Passwords for Login
userSchema.methods.comparePassword = async function (candidatePassword) {
  // Securely compare the provided password with the hashed password in the database
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema);
module.exports = User;
