// required dependencies
const path = require('path');
const express = require('express');
const bp = require('body-parser');

// import controllers
const passData = require('./controllers/passData.controller');
const search = require('./controllers/search.controller');

// create express app
const app = express();

// dotenv package
require('dotenv').config();

// port number
const PORT = process.env.PORT || 3004;

// environment
const NODE_ENV = process.env.NODE_ENV;

// middleware
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client/dist/client')));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// render client app
app.get(['/'], (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/dist/client', 'index.html'));
});

// endpoints
app.get('/api/pass-data', passData);
app.get('/api/search', search);

// run server
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}\nenv: ${NODE_ENV}`);
});
