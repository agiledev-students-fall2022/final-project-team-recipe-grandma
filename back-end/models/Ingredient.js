const mongoose = require('mongoose');

const Ingredient = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a ingredient'],
  },
  ingredientType: {
    type: String,
    required: true,
  },
  // type: {
  //   type: String,
  //   require: [true, 'Please add a ingredient type'],
  // },
});

module.exports = mongoose.model('Ingredient', Ingredient);
