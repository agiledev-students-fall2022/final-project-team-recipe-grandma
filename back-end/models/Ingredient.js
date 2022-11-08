const mongoose = require('mongoose');

const Ingredient = mongoose.Schema({
  ingredient: {
    type: String,
<<<<<<< HEAD
    required: true,
=======
    required: [true, 'Please add a ingredient'],
  },
  type: {
    type: String,
    require: [true, 'Please add a ingredient type'],
>>>>>>> master
  },
});

module.exports = mongoose.model('Ingredient', Ingredient);
