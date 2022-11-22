const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
  },
  {
    timestamps: true,
  },
);

User.pre('save', async (next) => {
  if (this.isModified('password')) {
    await bcrypt.hashSync(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('User', User);
