const express = require('express');
const RecipeController = require('../controllers/RecipeController');

const router = express.Router();

// TO-DO list
// ========================================
// YEONIE - DONE: Allow fetch by ID
// YEONIE - DONE: Allow fetch All or fetch via pagination
// Allow fetch recipes by user ID (this can should fall under ownership of user routes)
// Allow fetch recommended recipes algorithmically
// YEONIE - DONE: Add recipe deletion
// YEONIE - WORKING: Add recipe update/edit by single property or more in one dynamic route

// FRONT-END work for later
// ========================================
// Link all functionalities to front-end
// Link recipe creation to front-end

// test
router.get('/test', RecipeController.TestRecipeFunction);
// create new recipe
router.post('/create', RecipeController.NewRecipe);
// delete a recipe
router.get('/delete/:index', RecipeController.DeleteRecipe);
// update a recipe
router.get('/update/:index', RecipeController.UpdateRecipe);
// get all recipes
router.get('/all', RecipeController.GetRecipes);
// single recipe
router.get('/:index', RecipeController.SingleRecipe);
// recipe recommended based on user's likes
router.get('/recommendation', RecipeController.RecommendedRecipe);

module.exports = router;
