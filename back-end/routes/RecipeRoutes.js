const express = require('express');
const RecipeController = require('../controllers/RecipeController');

const router = express.Router();

// TO-DO list before next tuesday
// 1) show user's created recipes on front-end
// Created recipes are now successfully uploaded to MongoDB
// 2) recipe recommending based on user's likes
// Filter recommended recipes
// Return the exact recommended recipes only

// test
router.get('/test', RecipeController.TestRecipeFunction);
// create new recipe - HALF DONE (11/18)
router.post('/create', RecipeController.NewRecipe);
// get all recipes - DONE (11/18)
router.get('/all', RecipeController.GetRecipes);
// single recipe - DONE (11/18)
router.get('/:index', RecipeController.SingleRecipe);
// recipe recommended based on user's likes
router.get('/recommendation', RecipeController.RecommendedRecipe);

module.exports = router;
