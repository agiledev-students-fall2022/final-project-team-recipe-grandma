const express = require('express');
const RecipeController = require('../controllers/RecipeController');

const router = express.Router();

// test
router.get('/test', RecipeController.TestRecipeFunction);
// get recipe
router.get('/create', RecipeController.CreateRecipe);
// single recipe
router.get('/single', RecipeController.SingleRecipe);

// recommended recipe: recipe recommended based on user's likes
// router.post('recipe', RecipeController.RecommendedRecipe);

module.exports = router;
