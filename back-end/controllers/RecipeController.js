// const express = require('express');
// const RecipeRouter = express.Router();
// const axios = require('axios');
const data = require('../mockRecipeData.json');
const LikedRecipes = require('../mockLikedRecipeData.json');
const Recipe = require('../models/Recipe');

class RecipeController {
  static async TestRecipeFunction(req, res) {
    if (req.body.text) {
      return res.status(400).json({ message: 'Bad request' });
    }
    return res.status(200).json({ message: 'Hello, World! Recipes here!' });
  }

  // get list of all the recipes
  static async CreateRecipe(req, res) {
    if (req.body.text) {
      return res.status(400).json({ message: 'Bad request' });
    }
    return res.status(200).send(data);
  }

  // create a recipe
  static async NewRecipe(req, res) {
    const {
      index, name, ingredients, steps, imageURL,
    } = req.body;
    if (!index || !name || !ingredients || !steps || !imageURL) {
      return res.status(400);
    }
    const recipe = await Recipe.create({
      index,
      name,
      ingredients,
      steps,
      imageURL,
    });
    if (recipe) {
      return res.status(201).json({
        index: recipe.index,
        name: recipe.name,
        ingredients: recipe.ingredients,
        steps: recipe.steps,
        imageURL: recipe.imageURL,
      });
    }
    return res.status(400);
  }

  // single recipe in a page
  // /rgapi/recipe/:index
  static async SingleRecipe(req, res) {
    const item = data[req.params.index];
    try {
      res.status(200).send(item);
    } catch (err) {
      res.json({ message: err.message });
    }
  }

  // recommended recipe based on user's likes
  // NEED TO DEVELOP ALGORITHM
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
// FOR MONGODB (NEW / BIGGER DATABASE WE WILL BE USING LATER)
// class RecipeController {
//   static async TestRecipeFunction(req, res) {
//     if (req.body.text) {
//       return res.status(400).json({ message: 'Bad request test!' });
//     }
//     return res.status(200).json({ message: 'Hello, World! Recipes here!' });
//   }

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

//   // /rgapi/recipe/:index
//   static async DeleteRecipe(req, res) {
//     try {
//       const RemoveRecipe = await Recipe.remove(req.params.index);
//       res.json(RemoveRecipe);
//     } catch (err) {
//       res.json({ message: err.message });
//     }
//   }

//   // /rgapi/recipe/:index
//   static async SingleRecipe(req, res) {
//     try {
//       const SingleRecipe = await Recipe.findById(req.params.index);
//       res.json(SingleRecipe);
//     } catch (err) {
//       res.json({ message: err.message });
//     }
//   }

//   // static async RecommendedRecipe(req, res) {
//   // }
// }

module.exports = RecipeController;
