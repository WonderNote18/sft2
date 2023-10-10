const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();

const sessionStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI,
  collectionName: 'user-session',
  ttl: parseInt(process.env.SESSION_EXPIRY),
  autoRemove: 'native',
  crypto: {
    secret: process.env.MONGO_SECRET
  }
});

const sessionConfig = {
  name: process.env.SESSION_LABEL,
  secret: process.env.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true
  }
};

const appSession = session(sessionConfig);

module.exports = appSession;