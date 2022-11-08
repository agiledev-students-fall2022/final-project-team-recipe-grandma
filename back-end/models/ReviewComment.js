const mongoose = require('mongoose');

const ReviewComment = mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  stars: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  parentId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('ReviewComment', ReviewComment);
