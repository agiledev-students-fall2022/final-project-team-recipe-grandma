console.log('hello');

const express = require('express');
const MyRecipeController = require('../controllers/MyRecipeController');

const router = express.Router();

router.get('/myrecipeTest', MyRecipeController.TestMyRecipeFunction);
router.get('/myrecipes', MyRecipeController.GetMyRecipe);

module.exports = router;
