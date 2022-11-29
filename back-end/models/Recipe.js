const mongoose = require('mongoose');

const Recipe = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
  },
  name: {
    type: String,
    required: true,
  },
  ingredients: [
    {
      id: mongoose.Schema.Types.ObjectId,
      name: String,
      ingredientType: String,
      quantity: mongoose.Schema.Types.Number,
      unit: String,
    },
  ],
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
