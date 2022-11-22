const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
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
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb('JPEG and PNG only supported', false);
  }
};

const des = (req, file, cb) => {
  cb(null, 'uploads');
};
const filen = (req, file, cb) => {
  cb(null, uuidv4() + file.originalname);
};

const storage = multer.diskStorage({
  destination: des,
  filename: filen,
});

const upload = multer({ storage, fileFilter });

// test
router.get('/test', RecipeController.TestRecipeFunction);
// create new recipe
router.post('/create', upload.single('recipeImage'), RecipeController.NewRecipe);
// recommend recipe by ingredients
// router.get('/recbyingredients/:userid', RecipeController.RecommendbyIngredients);
// // recipe recommended based on user's likes
// router.get('/recbylikes', RecipeController.RecommendbyLike);
// delete a recipe
router.get('/delete/:id', RecipeController.DeleteRecipe);
// get all recipes
router.get('/all', RecipeController.GetRecipes);
// single recipe
router.get('/:id', RecipeController.SingleRecipe);
// get recipe by user id
router.get('/user/:userid', RecipeController.getRecipeByUser);

module.exports = router;
