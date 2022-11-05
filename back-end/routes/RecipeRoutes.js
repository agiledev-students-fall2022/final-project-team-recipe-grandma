const express = require('express');
const RecipeController = require('../controllers/RecipeController');

const router = express.Router();

router.get('/test', RecipeController.TestRecipeFunction);
router.post('/recipe', RecipeController.CreateRecipe);

module.exports = router;
