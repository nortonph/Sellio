const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  city: String,
  country: String,
  itemsBought: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  itemsSold: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
});

module.exports = mongoose.model("User", userSchema);