const mongoose = require('mongoose');
// const { addListener } = require('nodemon');

const PostSchema = mongoose.Schema({
  userId: {
    type: String,
    require: true,
  },
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
    type: String,
    required: true,
  },
  // like: {
  //   type: Number,
  //   required: false,
  // },
});

module.exports = mongoose.model('Posts', PostSchema);
