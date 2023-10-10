const User = require('../models/User');
const debug = require("debug")('sft2:session-controller');

class SessionController {
  static async isAuthenticated(req, res, next) {
    const reqSession = req.session;

    const isSessionActive = req.session.expires < new Date();
    const isSessionStored = await req.session.store.get(reqSession.id);
    const isUserExists = await User.findById(reqSession.user.UUID);
    if (req.session &&
      isSessionActive,
      isSessionStored,
      isUserExists
    ) {
      debug(req.session);
      next();
    } else {
      res.status(401).json({ error: 'Login expired, please log in'});
    }
  }

  static getSessionData(req, res, next) {
    const userData = req.session.user;
    debug(req.session);

    if (userData) {
      req.userData = userData;
      debug(req.session);
      next();
    } else {
      res.status(400).json({ error: 'Login expired' });
      return;
    }
  }

  static getSessionCookie(req, res, next) {
    const userCookie = req.cookies['sft2.sid'];

    if (userCookie) {
      req.userCookie = userCookie;
      debug(req.userCookie);
      next();
    } else {
      res.status(400).json({ error: 'Login expired' });
      return;
    }
  }
}

module.exports = SessionController;