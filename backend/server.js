const dotenv = require('dotenv').config();
const express = require('express');

const cors = require('cors');

const port = process.env.PORT || 5000;
const connectDB = require('./db');

connectDB();
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

app.use('/transactions', require('./routes/transactionRoutes'));
