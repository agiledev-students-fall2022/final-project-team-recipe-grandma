const mongoose = require('mongoose');

const Ingredient = mongoose.Schema({
  ingredient: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Ingredient', Ingredient);
