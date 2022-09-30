const express = require('express');

const router = express.Router();

const {
  getTransactions,
  postTransactions,
  deleteTransactions,
  updateTransactions,
} = require('../controller/transacController');

router.route('/').get(getTransactions);
router.route('/new').post(postTransactions);
router.route('/delete/:id').delete(deleteTransactions);
router.route('/update/:id').put(updateTransactions);

module.exports = router;
