const findConfig = require('find-config');
/* eslint-disable no-unused-vars */
const dotenv = require('dotenv').config({ path: findConfig('.env') });
/* eslint-enable no-unused-vars */

const express = require('express');
const connectDB = require('./config/db');

// CONSTANTS
const port = process.env.API_PORT;

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
const UserRoutes = require('./routes/UserRoutes');

app.use('/rgapi/user', UserRoutes);
app.listen(port, () => console.log(`Server started on PORT: ${port}`));
