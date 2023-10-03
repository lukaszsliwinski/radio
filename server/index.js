// required dependencies
const path = require('path');
const express = require('express');
const bp = require('body-parser');

// import database connection
const dbConnect = require('./config/db.config');

// import auth middleware
const auth = require('./middleware/auth.middleware');

// import controllers
const search = require('./controllers/search.controller');
const register = require('./controllers/register.controller');
const login = require('./controllers/login.controller');
const getUser = require('./controllers/getUser.controller');
const changePassword = require('./controllers/changePassword.controller');
const addFavourite = require('./controllers/addFavourite.controller');
const checkFavourite = require('./controllers/checkFavourite.controller');
const getFavourites = require('./controllers/getFavourites.controller');
const deleteFavourite = require('./controllers/deleteFavourite.controller');
const addRecent = require('./controllers/addRecent.controller');
const getRecent = require('./controllers/getRecent.controller');

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

// render client app
app.get(['/'], (request, response) => {
  response.sendFile(path.resolve(__dirname, '../client/dist/client', 'index.html'));
});

// endpoints
app.get('/api/get-user', auth, getUser);
app.get('/api/get-favourites', auth, getFavourites);
app.get('/api/get-recent', auth, getRecent);

app.post('/api/search', search);
app.post('/api/register', register);
app.post('/api/login', login);
app.post('/api/change-password', auth, changePassword);
app.post('/api/add-favourite', auth, addFavourite);
app.post('/api/check-favourite', auth, checkFavourite);
app.post('/api/delete-favourite', auth, deleteFavourite);
app.post('/api/add-recent', auth, addRecent);

// default favicon endpoint
app.get('/api/img/default-radio-icon', (request, response) => {
  response.sendFile(path.resolve(__dirname, './img', 'default-radio-icon.png'));
})

// execute database connection
dbConnect();

// run server
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}\nenv: ${NODE_ENV}`);
});
