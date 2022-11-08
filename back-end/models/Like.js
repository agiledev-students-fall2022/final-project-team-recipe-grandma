const mongoose = require('mongoose');

const Like = mongoose.Schema({
  userId: {
    type: String,
    required: [true, 'Please add user ID'],
  },
  recipeId: {
    type: String,
    required: [true, 'Please add recipe ID'],
  },
});

module.exports = mongoose.model('Like', Like);
