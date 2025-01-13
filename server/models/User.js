const mongoose = require('./db.js');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  contactInfo: { type: String, required: true, },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  itemsBought: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
  itemsSold: [{ type: mongoose.Schema.Types.ObjectId, ref: "Item" }],
});

module.exports = mongoose.model("User", userSchema);