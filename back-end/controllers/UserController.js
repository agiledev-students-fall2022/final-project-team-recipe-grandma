const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// In the future, may have a wrapper for each controller func
// Also will have a function in controller that defines routes
class UserController {
  static #generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
  }

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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      User
        .findOne({ email })
        .then((userExistence) => {
          if (userExistence) throw new Error('User exists.');
        }).then(() => {
          User.create({
            name,
            email,
            password: hashedPassword,
          }).then((user) => res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: UserController.#generateToken(user.id),
          })).catch(() => {
            throw new Error('Failed to create user');
          });
        }).catch((err) => res.status(400).json({ message: err.message }));
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
    }
    return res.status(400).json({ message: 'Registration failed arbitrarily.' });
  }

  static async LoginUser(req, res) {
    const { email, password } = req.body;

    return User.findOne({ email })
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password).then((bool) => {
            if (bool) {
              res.status(200).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: UserController.#generateToken(user.id),
              });
            } else {
              throw new Error('Password is incorrect');
            }
          });
        } else {
          throw new Error('User not found');
        }
      }).catch((err) => {
        res.status(400).json({ message: err.message });
      });
  }

  static async GetProfile(req, res) {
    return res.status(200).json({
      message: 'Profile test!',
    });
  }
}

module.exports = UserController;
