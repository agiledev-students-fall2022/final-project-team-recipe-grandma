const express = require('express'); //have the express into the file
const app = express(); //execute express

const mongoose = require('mongoose');
require('dotenv/config'); // used to help us hide our mongoose url

const bodyParser = require('body-parser');

app.use(bodyParser.json());

// IMPORT ROUTES
const postRouter = require('./routes/Posts');

// YOU HAVE THE ABILITY TO CREATE **ROUTES** NOW
app.use('/post',postRouter);

app.get('/',(req,res) => {
    res.send("We are on home!");
});

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true },
                () => console.log('connected to db!'));

app.listen(3000); // start listeing for the server