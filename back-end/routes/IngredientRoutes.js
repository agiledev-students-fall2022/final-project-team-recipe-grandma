const express = require('express');
const IngredientsController = require('../controllers/IngredientController');

const router = express.Router();

router.get('/test', IngredientsController.TestIngredientFunction);
router.get('/all', IngredientsController.GetIngredients);
router.get('/search/:name', IngredientsController.FetchIngredientsByName);

module.exports = router;
