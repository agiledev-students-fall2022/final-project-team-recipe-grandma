const dotenv = require('dotenv').config({ path: require('find-config')('.env') });
console.log(dotenv);
const express = require('express');

// CONSTANTS
const port = process.env.API_PORT;

const app = express();

// ROUTES
const UserRoutes = require('./routes/UserRoutes');

app.use('/rgapi/user', UserRoutes);
app.listen(port, () => console.log(`Server started on PORT: ${port}`));