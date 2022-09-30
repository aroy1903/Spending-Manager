const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const transactionSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
});

const transaction = mongoose.model('Transaction', transactionSchema);

module.exports = transaction;
