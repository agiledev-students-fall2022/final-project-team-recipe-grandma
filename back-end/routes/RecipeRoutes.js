const express = require('express');
const RecipeController = require('../controllers/RecipeController');

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
router.get('/test', RecipeController.TestRecipeFunction);
// get recipe
router.get('/recipelist', RecipeController.CreateRecipe);
// single recipe
router.get('/:index', RecipeController.SingleRecipe);
// create new recipe
router.post('/create', RecipeController.NewRecipe);
// recipe recommended based on user's likes
router.get('/recommendation', RecipeController.RecommendedRecipe);

module.exports = router;
