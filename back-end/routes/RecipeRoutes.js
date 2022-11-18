const express = require('express');
const RecipeController = require('../controllers/RecipeController');

const router = express.Router();

// TO-DO list
// ========================================
// YEONIE - DONE: Allow fetch by ID
// YEONIE - DONE: Allow fetch All or fetch via pagination
// Allow fetch recipes by user ID (this can should fall under ownership of user routes)
// Allow fetch recommended recipes algorithmically
// Link recipe creation to front-end
// YEONIE - DONE: Add recipe deletion
// Add recipe updat/edit by single property or more in one dynamic route
// Link all functionalities to front-end

// test
router.get('/test', RecipeController.TestRecipeFunction);
// create new recipe
router.post('/create', RecipeController.NewRecipe);
// delete a recipe
router.get('/delete/:index', RecipeController.DeleteRecipe);
// get all recipes
router.get('/all', RecipeController.GetRecipes);
// single recipe
router.get('/:index', RecipeController.SingleRecipe);
// recipe recommended based on user's likes
router.get('/recommendation', RecipeController.RecommendedRecipe);
