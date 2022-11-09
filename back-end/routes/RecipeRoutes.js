const express = require('express');
const RecipeController = require('../controllers/RecipeController');

const router = express.Router();

// test
router.get('/test', RecipeController.TestRecipeFunction);
// get recipe
router.get('/recipelist', RecipeController.CreateRecipe);
// create new recipe
router.post('/create', RecipeController.NewRecipe);
// recipe recommended based on user's likes
router.get('/recommendation', RecipeController.RecommendedRecipe);
router.get('/all', RecipeController.GetRecipes);
router.get('/my-recipes', RecipeController.GetUserRecipes);

// single recipe
router.get('/:index', RecipeController.SingleRecipe);

module.exports = router;
