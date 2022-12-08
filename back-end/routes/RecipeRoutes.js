const express = require('express');
const RecipeController = require('../controllers/RecipeController');
const upload = require('../middleware/upload');
const { authenticate } = require('../middleware/auth');

const router = express.Router();
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
});

// test
router.get('/test', authenticate, RecipeController.TestRecipeFunction);
// create new recipe
router.post('/create', [upload.single('file'), authenticate], RecipeController.CreateRecipe);
// recommend recipe by ingredients & display by descending like counts
router.post('/search-by-ingredients/', authenticate, RecipeController.RecommendedbyIngredients);
// search by recipe name
router.get('/recbyname/:name', RecipeController.SearchbyName);
// delete a recipe
router.get('/delete/:id', RecipeController.DeleteRecipe);
// get all recipes
router.get('/all', RecipeController.GetRecipes);
// single recipe
router.get('/:id', authenticate, RecipeController.SingleRecipe);
// get recipe by user id
router.get('/user/myrecipe', authenticate, RecipeController.getRecipeByUser);

module.exports = router;
