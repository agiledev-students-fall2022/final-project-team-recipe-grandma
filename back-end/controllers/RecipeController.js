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
      userId, name, ingredients, steps, imageURL,
    } = req.body;
    if (!userId || !name || !ingredients || !steps || !imageURL) {
      return res.status(400);
    }
    try {
      Recipe.create({
        userId,
        name,
        ingredients,
        steps,
        imageURL,
      }).then((recipe) => res.status(201).json({
        userId: recipe.userId,
        name: recipe.name,
        lowercasedName: recipe.name.toLowerCase().replace(' ', '-'),
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

  // recommendation algorithm 1: search by ingredients
  static async RecommendedbyIngredients(req, res) {
    // still need to develop
    // for now, returning to home page with all recipes in MongoDB
    const recipe = Recipe.find({}, (err, rec) => {
      if (err) {
        console.log(err);
      } else {
        res.json(rec);
      }
      console.log(recipe);
    });
  }

  // recommendation algorithm 2: search by user's likes

  // recommendation algorithm 3: search by recipe name
  static async RecommendedbyName(req, res) {
    // if input from URL = big-night-pizza,
    // modifiedname = big night pizza,
    // $options: changes modifedname to case-insensitive to match with name
    const modifiedname = req.params.name.replace('-', ' ');
    console.log(modifiedname);
    const recipe = Recipe.find({ name: { $regex: modifiedname, $options: 'i' } }, (err, rec) => {
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
