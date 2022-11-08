const findConfig = require('find-config');
/* eslint-disable no-unused-vars */
const dotenv = require('dotenv').config({ path: findConfig('.env') });
/* eslint-enable no-unused-vars */

const express = require('express');
const connectDB = require('./config/db');

// CONSTANTS
const port = process.env.API_PORT || 5000;

connectDB();

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
const UserRoutes = require('./routes/UserRoutes');
const RecipeRoutes = require('./routes/RecipeRoutes');
const LikeRoutes = require('./routes/LikeRoutes');

// adding like here
app.get('/', (req, res) => {
  res.send('iefjeio');
});

// ending like here

app.use('/rgapi/user', UserRoutes);
app.use('/rgapi/recipe', RecipeRoutes);
app.use('/rgapi/like', LikeRoutes);
app.listen(port, () => console.log(`Server started on PORT: ${port}`));
