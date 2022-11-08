const mongoose = require('mongoose');
// const { addListener } = require('nodemon');

const PostSchema = mongoose.Schema({
  index: {
    type: String,
    required: true,
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
  imageURL: {
    type: Array,
    required: true,
  },
  // like: {
  //   type: Number,
  //   required: false,
  // },
});

module.exports = mongoose.model('Posts', PostSchema);
