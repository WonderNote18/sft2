const User = require('../models/User');
const debug = require("debug")('sft2:authController');
require('dotenv').config();

class AuthController {
  static async isAuth(req, res, next) {
    try {
      const reqSession = req.session;
      debug(reqSession);
      const isSessionActive = reqSession.expires < new Date();
      const isUserExists = await User.findById(reqSession.user._id);

      const isSession = Boolean(reqSession && isSessionActive && isUserExists);
      if (isSession) {
        next();
      } else {
        res.status(401).json({ error: 'Login expired, please log in' });
      }
    } catch (err) {
      res.status(401).json({ error: 'Login expired, please log in' });
    }
    return;
  }

  static async userRegister(req, res, next)
  {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const emailAddress = req.body.emailAddress;
    const password = req.body.password;

    if (!firstName ||
      !lastName ||
      !username ||
      !emailAddress ||
      !password)
      {
        res.status(400).json({ error: 'Invalid input' });
        return;
      }

    try {
      const newUser = await User.register(
        firstName,
        lastName,
        username,
        emailAddress,
        password
      );

      if (newUser) {
        req.session.reload(function(err) {
          if (err) next(err);

          const newUserData = JSON.parse(JSON.stringify(newUser));
          delete newUserData.password;

          req.session.user = newUserData;
          req.session.save(function(err) {
            if (err) next(err);

            res.status(200).json({
              message: 'Registration successful',
              user: newUserData
            });
          });
          return;
        });
      }
    } catch (err) {
      res.status(400).send(err.message);
      return;
    }
  }

  static async userLogin(req, res, next)
  {
    try {
      const loginUser = await User.login(req.body.userString, req.body.password);

      if (loginUser) {
        req.session.reload(function(err) {
          if (err) next(err);

          var loginUserData = JSON.parse(JSON.stringify(loginUser));
          delete loginUserData.password;

          req.session.user = loginUserData;
          req.session.save(function(err) {
            if (err) next(err);

            res.status(202).json({
              message: 'Success',
              user: loginUserData
            });
          });
          return;
        });
      } else {
        res.status(401).json({error: 'Login failed'});
        return;
      }
    } catch (err) {
      res.status(400).json({error: err.message});
      return;
    }
  }

  static async userLogout(req, res, next) {
    const session = req.session;

    await session.destroy(function(err) {
      if (err) next(err);
    });

    res.clearCookie(process.env.SESSION_LABEL)
      .status(200)
      .json({ message: 'User logout'});
    return;
  }
}

module.exports = AuthController;