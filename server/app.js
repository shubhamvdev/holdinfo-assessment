require('dotenv').config();

const express = require('express');
const cors = require('cors');
const createError = require('http-errors');

//Database Connection
require('./utils').databaseConnection;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', async (req, res, next) => {
  res.send({ message: 'Awesome it works 🐻' });
});

//Importing Routes
const {
  recordRoute,
} = require('./routes');

app.use('/api/record', recordRoute);

//Error Middleware
app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 HOLDINFO APP: http://localhost:${PORT}`));
