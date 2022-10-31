const dotenv = require('dotenv').config({ path: require('find-config')('.env') });
console.log(dotenv);
const express = require('express');

// CONSTANTS
const port = process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
const UserRoutes = require('./routes/UserRoutes');

app.use('/rgapi/user', UserRoutes);
app.listen(port, () => console.log(`Server started on PORT: ${port}`));