const mongoose = require('mongoose');

const Ingredient = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a ingredient'],
    unique: true,
  },
  type: {
    type: String,
    required: [true, 'Please add a ingredient type'],
  },
});

module.exports = mongoose.model('Ingredient', Ingredient);
