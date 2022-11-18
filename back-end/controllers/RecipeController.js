// const express = require('express');
// const RecipeRouter = express.Router();
// const axios = require('axios');
// const data = require('../mockRecipeData.json');
const LikedRecipes = require('../mockLikedRecipeData.json');
const Recipe = require('../models/Recipe');

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
      index, name, ingredients, steps, imageURL,
    } = req.body;
    if (!index || !name || !ingredients || !steps || !imageURL) {
      return res.status(400);
    }
    try {
      Recipe
        .findOne({ index })
        .then((recipeExistence) => {
          if (recipeExistence) throw new Error('The Recipe exists');
        }).then(() => {
          Recipe.create({
            index,
            name,
            ingredients,
            steps,
            imageURL,
          }).then((recipe) => res.status(201).json({
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

  // recommended recipe based on user's likes
  // NEED TO DEVELOP ALGORITHM !!!
  static async RecommendedRecipe(req, res) {
    const item = LikedRecipes[1];
    try {
      res.status(200).send(item);
    } catch (err) {
      res.json({ message: err.message });
    }
  }
}
// ===============================================================================

//   static async CreateRecipe(req, res) {
//     const recipe = new Recipe({
//       index: req.body.index,
//       name: req.body.name,
//       ingredients: req.body.ingredients,
//       steps: req.body.directions,
//       imageURL: req.body.imageURL,
//     });
//     try {
//       const NewRecipe = await recipe.save();
//       res.status(201).send(NewRecipe);
//     } catch (err) {
//       res.status(400).json({ message: err });
//     }
//   }

module.exports = RecipeController;
