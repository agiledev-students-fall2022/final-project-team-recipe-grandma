const mongoose = require('mongoose');

const Like = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please add user ID'],
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, 'Please add recipe ID'],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Like', Like);
