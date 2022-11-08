const express = require('express');
const RecipeController = require('../controllers/RecipeController');

const router = express.Router();

// test
router.get('/test', RecipeController.TestRecipeFunction);
// get recipe
router.post('/recipe', RecipeController.CreateRecipe);
// delete recipe
router.post('/recipe/:id', RecipeController.DeleteRecipe);
// single recipe
router.post('recipe/:id', RecipeController.SingleRecipe);
// edit likes
// router.post('/recipe', RecipeController.EditLike);
// edit comments
// router.post('./recipe', RecipeController.EditComment);
// recommended recipe: recipe recommended based on user's likes
// router.post('recipe', RecipeController.RecommendedRecipe);

module.exports = router;

module.exports = router;
