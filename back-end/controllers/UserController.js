// In the future, may have a wrapper for each controller func
// Also will have a function in controller that defines routes
class UserController {
  constructor() {

  }

  // @desc Test
  // @route /rgapi/user/test/:param
  // @access Public
  static async TestControllerFunction(req, res) {
    res.status(200).json({ message: 'Hello, World! User here! '});
  }
}

module.exports = UserController;