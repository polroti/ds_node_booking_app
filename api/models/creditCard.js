const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  holderName: {
    type: String,
    required: true,
  },
  cardNumber: {
    type: Number,
    required: true,
    maxLength: 16,
  },
  cvc: {
    type: Number,
    maxLength: 3,
  },
  amount: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("CreditCard", cardSchema);
