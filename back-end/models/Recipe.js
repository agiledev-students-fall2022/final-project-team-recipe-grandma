const mongoose = require('mongoose');
// const { addListener } = require('nodemon');

const Recipe = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  name: {
    type: String,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  steps: {
    type: Array,
    required: true,
  },
  cover: {
    type: mongoose.Schema.Types.ObjectId,
  },
  // like: {
  //   type: Number,
  //   required: false,
  // },
}, { timestamps: true });

module.exports = mongoose.model('Recipe', Recipe);
