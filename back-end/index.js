const findConfig = require('find-config');
/* eslint-disable no-unused-vars */
const dotenv = require('dotenv').config({ path: findConfig('.env') });
/* eslint-enable no-unused-vars */

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const path = require('path');
// const multer  = require('multer');
const connectDB = require('./config/db');

// const upload = multer();

// CONSTANTS
const port = process.env.API_PORT || 5000;

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  credentials: true, // Enables cookies. AJAX requests require withCredentials
};

connectDB();

const app = express();

// Middlewares
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined'));
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// ROUTES
const UserRoutes = require('./routes/UserRoutes');
const RecipeRoutes = require('./routes/RecipeRoutes');
const ReviewCommentRoutes = require('./routes/ReviewCommentRoutes');
const IngredientRoutes = require('./routes/IngredientRoutes');
const LikeRoutes = require('./routes/LikeRoutes');
const MediaRoutes = require('./routes/MediaRoutes');

app.use('/rgapi/user', UserRoutes);
app.use('/rgapi/recipe', RecipeRoutes);
app.use('/rgapi/review', ReviewCommentRoutes);
app.use('/rgapi/ingredient', IngredientRoutes);
app.use('/rgapi/like', LikeRoutes);
app.use('/rgapi/media', MediaRoutes);
const server = app.listen(port, () => console.log(`Server started on PORT: ${port}`));
module.exports = server;
