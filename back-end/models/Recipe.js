const mongoose = require('mongoose');
// const { addListener } = require('nodemon');

const PostSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    required: false,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  directions: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model('Posts', PostSchema);
