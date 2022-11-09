const axios = require('axios');
// const MyRecipe = require('../models/MyRecipe');

class MyRecipeController {
  static async TestMyRecipeFunction(req, res) {
    if (req.body.text) {
      return res.status(400).json({ message: 'Bad request test!' });
    }
    return res.status(200).json({ message: 'My recipe here' });
  }

  // static async CreateMyRecipe(req, res) {
  //   const {
  //     recipeId, name, imageURL,
  //   } = req.body;
  //   const myRecipe = await MyRecipe.create({
  //     index,
  //     name,
  //     date,
  //     image,
  //   });

  //   if (myRecipe) {
  //     return res.status(201).json({
  //       index: myRecipe.index,
  //       name: myRecipe.name,
  //       date: myRecipe.date,
  //       image: myRecipe.image,
  //     });
  //   }
  //   return res.status(400);
  // }

  // for deleting recipe functionality -> when database is integrated, deleting a
  // recipe from profile would also have to delete it from the database of all recipes
  // static async DeleteMyRecipe(req, res) {
  //   try {
  //     const RemoveMyRecipe = await MyRecipe.remove(req.params.index);
  //     res.json(RemoveMyRecipe);
  //   } catch (err) {
  //     res.json({ message: err.message });
  //   }
  // }

  // when database is integrated, we would have to fetch from the database the recipes
  // that user liked and recipes that user created instead of the current url
  static async GetMyRecipe(req, res) {
    const myRecipeData = await axios('https://raw.githubusercontent.com/OyungerelA/sampleRecipes/main/myrecipe.json').catch((err) => console.log(err.message));
    if (myRecipeData && Array.isArray(myRecipeData.data)) {
      return res.status(200).json(myRecipeData.data);
    }
    return res.status(400);
  }
}

module.exports = MyRecipeController;
