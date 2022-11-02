// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// In the future, may have a wrapper for each controller func
// Also will have a function in controller that defines routes
class UserController {
  // @desc Test
  // @route /rgapi/user/test/:param
  // @access Public
  static async TestControllerFunction(req, res) {
    if (req.body.text) {
      return res.status(400).json({ message: 'Bad request test!' });
    }
    return res.status(200).json({ message: 'Hello, World! User here!' });
  }

  // @desc Register a user
  // @route /rgapi/user/register
  // @access Public
  static async RegisterUser(req, res) {
    // TODO @mohammedajao - Add error clarification for frontend
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400);
    }

    const doesUserExist = await User.findOne({ email });
    if (doesUserExist) {
      return res.status(400);
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    if (user) {
      return res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
      });
    }
    return res.status(400);
  }
}

module.exports = UserController;
