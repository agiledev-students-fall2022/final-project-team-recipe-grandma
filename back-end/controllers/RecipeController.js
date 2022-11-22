// const express = require('express');
// const RecipeRouter = express.Router();
// const axios = require('axios');
// const data = require('../mockRecipeData.json');
// const LikedRecipes = require('../mockLikedRecipeData.json');
const { ObjectId } = require('mongoose').Types;
const Recipe = require('../models/Recipe');
// const Ingredient = require('../models/Ingredient');

class RecipeController {
  static async TestRecipeFunction(req, res) {
    if (req.body.text) {
      return res.status(400).json({ message: 'Bad request' });
    }
    return res.status(200).json({ message: 'Hello, World! Recipes here!' });
  }

  static async CreateRecipe(req, res) {
    // Wrap in a try block due to JSON.parse
    // If JSON.parse fails, we'll have an error that'll crash us
    try {
      const {
        userId,
        name,
        ingredients,
        steps,
      } = req.body;

      const image = req.file;
      const ingredientsArr = JSON.parse(ingredients);
      const stepsArr = JSON.parse(steps);

      const mimetypes = ['image/png', 'image/jpeg', 'image/jpg'];

      // Input validation
      if (
        !ObjectId.isValid(userId)
        || typeof name !== 'string'
        || !Array.isArray(ingredientsArr)
        || !Array.isArray(stepsArr)
        || !image
        || !ObjectId.isValid(image.id)
        || !mimetypes.includes(image.mimetype)
      ) {
        return res.status(400).json({ message: 'Invalid fields' });
      }

      // Create the recipe if validation passes
      // We pass the image as an object ID as per our model's requirement
      // Thus, we can grab the image data from our image bucket later
      // In other words, in our HTML or post man, we can have a GET request
      // towards the route http://localhost:8000/rgapi/media/:imageId
      // And we get our image served to us directly from the database
      Recipe.create({
        userId,
        name,
        ingredients,
        steps,
        cover: image.id,
      }).then(async (recipe) => {
        res.status(200).json({
          _id: recipe.id,
          name: recipe.name,
          ingredients: recipe.ingredients,
          steps: recipe.steps,
          cover: recipe.cover,
        });
      }).catch((err) => res.status(500).json({ message: err.message }));
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
    return null;
  }

  // create a recipe
  static async NewRecipe(req, res) {
    const {
      userId, username, name, ingredients, steps, imageURL,
    } = req.body;
    if (!userId || !username || !name || !ingredients || !steps || !imageURL) {
      return res.status(400);
    }
    try {
      Recipe.create({
        userId,
        username,
        name,
        ingredients,
        steps,
        imageURL,
      }).then((recipe) => res.status(201).json({
        userId: recipe.userId,
        username: recipe.username,
        name: recipe.name,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        imageURL: recipe.imageURL,
      })).catch(() => {
        throw new Error('Failed to create recipe');
      });
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
    return null;
  }

  // delete recipe
  static async DeleteRecipe(req, res) {
    Recipe.deleteOne({ _id: req.params.id }, (err, rec) => {
      if (err) {
        console.log(err);
      } else {
        res.json(rec);
      }
      console.log('A recipe deleted!');
    });
  }

  // get all recipes
  static async GetRecipes(req, res) {
    const recipe = Recipe.find({}, (err, rec) => {
      if (err) {
        console.log(err);
      } else {
        res.json(rec);
      }
      console.log(recipe);
    });
  }

  // single recipe in a page
  static async SingleRecipe(req, res) {
    const recipe = Recipe.find({ _id: req.params.id }, (err, rec) => {
      if (err) {
        console.log(err);
      } else {
        res.json(rec);
      }
      console.log(recipe);
    });
  }

  // // recipe recommended by ingredients
  // static async RecommendbyIngredients(req, res) {
  //   // 1) get ingredients from user's shopping cart
  //   const addedIngredient = Ingredient.find({}, (err, rec) => {
  //     // 2) for each ingredient, check recipes containing the ingredient
  //     // addedIngredient.recipes
  //     // 3) check for repeated recipes
  //     // 4) rank recipes with more repetition higher
  //     // 5) return the final list in ranks
  //   })
  // }

  // // recommend recipe by user's likes
  // static async RecommendbyLike(req, res) {
  //   const likedRecipes = Like.find({ userID: req.params.userID }, (err, rec))
  //   // 1) fetch ingrients of the likedRecipes
  //   // 2) check for repeated recipes
  //   // 3) rank recipes with more repetition higher
  //   // 4) return the final list in ranks
  // }

  // recipes by user ID
  static async getRecipeByUser(req, res) {
    const recipe = Recipe.find({ userId: req.params.userId }, (err, rec) => {
      if (err) {
        console.log(err);
      } else {
        res.json(rec);
      }
      console.log(recipe);
    });
  }
}

module.exports = RecipeController;
