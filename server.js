require('dotenv').config();
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');

console.log('Starting CodeWhisperer server...'); // Log for server start process

// Establish a connection to the database
require('./database');

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Serve static content from 'public' directory
app.use(express.static('public'));

// Include our routes with the app
app.use('/', routes);

// Error handling middleware for not found errors
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// Error handling middleware for all other types of errors
app.use((error, req, res, next) => {
  console.error(`Error encountered: ${error.stack}`); // Log the full error stack trace
  res.status(error.status || 500).send(error.message || 'Something broke!');
});

// Start server listening
const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`); // Log server listening port
});