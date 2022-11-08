const express = require('express');
const IngredientsController = require('../controllers/IngredientController');

const router = express.Router();

router.get('/test', IngredientsController.TestIngredientFunction);
router.post('/ingredient', IngredientsController.CreateIngredient);

module.exports = router;
