const mongooese = require("mongoose");

const dialogPaySchema = mongooese.Schema({
  email: {
    type: String,
    required: true,
  },
  mobile: {
    type: Number,
    required: true,
  },
  pin: {
    type: Number,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
});
