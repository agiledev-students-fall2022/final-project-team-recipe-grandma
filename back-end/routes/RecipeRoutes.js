const express = require('express');
const RecipeController = require('../controllers/RecipeController');

const router = express.Router();

// TO-DO list
// ========================================
// Allow fetch recommended recipes algorithmically
// Recommended recipes by ingredients

// FRONT-END work for later
// ========================================
// Link all functionalities to front-end
// Link recipe creation to front-end

// test
router.get('/test', RecipeController.TestRecipeFunction);
// create new recipe
router.post('/create', RecipeController.NewRecipe);
// recommend recipe by ingredients
// router.get('/recbyingredients/:userid', RecipeController.RecommendbyIngredients);
// // recipe recommended based on user's likes
// router.get('/recbylikes', RecipeController.RecommendbyLike);
// delete a recipe
router.get('/delete/:index', RecipeController.DeleteRecipe);
// get all recipes
router.get('/all', RecipeController.GetRecipes);
// single recipe
router.get('/:index', RecipeController.SingleRecipe);
// get recipe by user id
router.get('/user/:userid', RecipeController.getRecipeByUser);

module.exports = router;
