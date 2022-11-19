// const express = require('express');
// const RecipeRouter = express.Router();
// const axios = require('axios');
// const data = require('../mockRecipeData.json');
// const LikedRecipes = require('../mockLikedRecipeData.json');
const Recipe = require('../models/Recipe');
// const Ingredient = require('../models/Ingredient');

class RecipeController {
  static async TestRecipeFunction(req, res) {
    if (req.body.text) {
      return res.status(400).json({ message: 'Bad request' });
    }
    return res.status(200).json({ message: 'Hello, World! Recipes here!' });
  }

  // create a recipe
  static async NewRecipe(req, res) {
    const {
      userId, index, name, ingredients, steps, imageURL,
    } = req.body;
    if (!userId || !index || !name || !ingredients || !steps || !imageURL) {
      return res.status(400);
    }
    try {
      Recipe
        .findOne({ index })
        .then((recipeExistence) => {
          if (recipeExistence) throw new Error('The Recipe exists');
        }).then(() => {
          Recipe.create({
            userId,
            index,
            name,
            ingredients,
            steps,
            imageURL,
          }).then((recipe) => res.status(201).json({
            userId: recipe.userId,
            index: recipe.index,
            name: recipe.name,
            ingredients: recipe.ingredients,
            steps: recipe.steps,
            imageURL: recipe.imageURL,
          })).catch(() => {
            throw new Error('Failed to create recipe');
          });
        }).catch((err) => res.status(400).json({ message: err.message }));
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
    return null;
  }

  // delete recipe
  static async DeleteRecipe(req, res) {
    Recipe.deleteOne({ index: req.params.index }, (err, rec) => {
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
    const recipe = Recipe.find({ index: req.params.index }, (err, rec) => {
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
