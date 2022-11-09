const mongoose = require('mongoose');

const MyRecipe = mongoose.Schema({
  recipeId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imageURL: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model('MyRecipe', MyRecipe);
