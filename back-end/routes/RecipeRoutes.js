const express = require('express');
const RecipeController = require('../controllers/RecipeController');

const router = express.Router();

router.get('/test', RecipeController.TestRecipeFunction);
router.get('/recipe', RecipeController.GetRecipe);

module.exports = router;
