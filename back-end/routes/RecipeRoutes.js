const express = require('express');
const RecipeController = require('../controllers/RecipeController');

const router = express.Router();

// test
router.get('/test', RecipeController.TestRecipeFunction);
// get recipe
router.post('/:index', RecipeController.CreateRecipe);
// single recipe
router.post('/:index', RecipeController.SingleRecipe);

// recommended recipe: recipe recommended based on user's likes
// router.post('recipe', RecipeController.RecommendedRecipe);

module.exports = router;
