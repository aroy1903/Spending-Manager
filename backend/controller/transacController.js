const asynchandler = require('express-async-handler');
const transaction = require('../model/Transaction');
const { Error } = require('mongoose');

const getTransactions = async (req, res) => {
  const allTransactions = await transaction.find();
  res.json(allTransactions);
  console.log('gotem');
};

const postTransactions = asynchandler(async (req, res) => {
  if (!req.body.text || !req.body.num) {
    res.status(400);
    throw new Error('Enter in text');
  }
  const newTransaction = new transaction({
    description: req.body.text,
    amount: req.body.num,
  });
  newTransaction.save();
  res.json(newTransaction);
});

const deleteTransactions = asynchandler(async (req, res) => {
  const transac = await transaction.findByIdAndDelete(req.params.id);
  if (!transac) {
    res.status(400);
    throw new Error(`${req.params.id} is invalid`);
  }
  res.json(transac);
});

const updateTransactions = asynchandler(async (req, res) => {
  const transac = await transaction.findByIdAndUpdate(req.params.id, {
    description: req.body.text,
    amount: req.body.num,
  });
  if (!transac) {
    throw new Error();
  }
  transac.save();
  res.json(transac);
});

module.exports = {
  getTransactions,
  postTransactions,
  deleteTransactions,
  updateTransactions,
};
