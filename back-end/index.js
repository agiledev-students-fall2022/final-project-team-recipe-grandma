const dotenv = require('dotenv').config({ path: require('find-config')('.env') });
console.log(dotenv);
const express = require('express');

// CONSTANTS
const port = process.env.API_PORT;

const app = express();

app.get('/rgapi/test', (req, res) => {
  res.status(200).json({ message: 'Test works! '});
});

app.listen(port, () => console.log(`Server started on PORT: ${port}`));