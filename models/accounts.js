const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  owner: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Account", accountSchema);
