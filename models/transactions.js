const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  income: {
    type: Boolean,
    default: false,
  },
  expense: {
    type: Boolean,
    default: false,
  },
  categoryName: {
    type: String,
    required: true,
    unique: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  toWhom: {
    type: String,
    default: "",
  },
  fromWhom: {
    type: String,
    default: "",
  },
  date: {
    type: String,
    required: true,
  },
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model(
  "Transaction",
  categorySchema
);
