const express = require('express');
const RecipeController = require('../controllers/RecipeController');
const upload = require('../middleware/upload');

const router = express.Router();

// test
router.get('/test', RecipeController.TestRecipeFunction);
// create new recipe
router.post('/create', upload.single('file'), RecipeController.CreateRecipe);
// recommendation algorithm 1: search by ingredients
router.post('/search-by-ingredients/', RecipeController.RecommendedbyIngredients);
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
