const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

// In the future, may have a wrapper for each controller func
// Also will have a function in controller that defines routes
class UserController {
  static #generateToken(id) {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '15s',
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

  static async TestToken() {
    console.log('Token test hit.');
  }

  static async RefreshUserToken(req, res) {
    const accessToken = req.cookies.token;
    res.cookie('foo1', 'bar123w2');
    console.log('Has access token?', accessToken, 'Cookies', req.cookies, 'Body', req.body.token);
    if (!accessToken) return res.sendStatus(401);
    res.clearCookie('token', { httpOnly: true });
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    const foundUser = await User.findById(decoded.id).select('-password');

    if (!foundUser) return res.sendStatus(403);

    const newAccessToken = UserController.#generateToken(foundUser._id);
    return res.json({ token: newAccessToken });
  }

  // @desc Register a user
  // @route /rgapi/user/register
  // @access Public
  static async RegisterUser(req, res) {
    // TODO @mohammedajao - Add error clarification for frontend
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: 'Invalid fields',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    try {
      User
        .findOne({ email })
        .then((userExistence) => {
          if (userExistence) throw new Error('User exists');
        }).then(() => {
          User.create({
            name,
            email,
            password: hashedPassword,
          }).then((user) => {
            const accessToken = UserController.#generateToken(user.id);
            const refreshToken = jwt.sign(
              { id: user.id },
              process.env.JWT_REFRESH_SECRET,
              { expiresIn: '1d' },
            );
            res.cookie('token', JSON.stringify(refreshToken), {
              maxAge: 30 * 24 * 60 * 60 * 1000,
              httpOnly: true,
              secure: false,
            });
            res.cookie('foo', 'bar');
            res.status(201).json({
              _id: user.id,
              name: user.name,
              email: user.email,
              token: accessToken,
            });
          }).catch(() => {
            throw new Error('Failed to create user');
          });
        }).catch((err) => res.status(400).json({ message: err.message }));
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: err.message });
    }
    return null;
  }

  static async LoginUser(req, res) {
    console.log('Got requested to login');
    const { cookies } = req;
    cookies.jwt = '22321';
    res.cookie('token1', 'token2');
    console.log('Cookies login', req.cookies);
    const { email, password } = req.body;

    return User.findOne({ email })
      .then((user) => {
        if (user) {
          bcrypt.compare(password, user.password).then((bool) => {
            if (bool) {
              const accessToken = UserController.#generateToken(user.id);
              const refreshToken = jwt.sign(
                { id: user.id },
                process.env.JWT_REFRESH_SECRET,
                { expiresIn: '1d' },
              );

              res.cookie('token', JSON.stringify(refreshToken), {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                secure: false,
              });

              res.status(200).send({
                _id: user.id,
                name: user.name,
                email: user.email,
                token: accessToken,
                refreshToken,
              });
            } else {
              throw new Error('Password is incorrect');
            }
          }).catch((err) => {
            res.status(400).json({ message: err.message });
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
