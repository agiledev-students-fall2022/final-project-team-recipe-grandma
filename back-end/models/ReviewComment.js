const mongoose = require('mongoose');

const ReviewComment = mongoose.Schema(
  {
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
    parentId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('ReviewComment', ReviewComment);
