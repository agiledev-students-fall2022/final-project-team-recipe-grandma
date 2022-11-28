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
// recommendation algorithm 1: search by ingredients
router.get('/recbyingredients/', RecipeController.RecommendedbyIngredients);
// recommendation algorithm 2: search by user's likes
// router.get('/recbylikes', RecipeController.RecommendbyLike);
// recommendation algorithm 3: search by recipe name
router.get('/recbyname/:name', RecipeController.RecommendedbyName);
// delete a recipe
router.get('/delete/:id', RecipeController.DeleteRecipe);
// get all recipes
router.get('/all', RecipeController.GetRecipes);
// single recipe
router.get('/:id', RecipeController.SingleRecipe);
// get recipe by user id
router.get('/user/:userid', RecipeController.getRecipeByUser);

module.exports = router;
