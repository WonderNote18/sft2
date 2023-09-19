var express = require('express');
var router = express.Router();
var checkSession = require('../controllers/session');

// Register User
router.post('/api/register', function (req, res, next) {
  // TODO: Register user
  res.status(200).json({message: '/api/register'});
});

// Login User
// router.post('/api/login', checkSession, function (req, res, next) {
  router.post('/api/login', function (req, res, next) {
  // TODO: Login user
  res.status(200).json({message: '/api/login'});
});

// Log User Out
router.post('/api/logout', function (req, res, next) {
  // TODO: Log User Out
  res.status(200).json({message: '/api/logout'});
});

// Forgot User Password
router.post('/api/forgot-password', function (req, res, next) {
  // TODO: Forgot User Password
  res.status(200).json({message: '/api/forgot-password'});
});

// Reset User Password
router.post('/api/reset-password', function (req, res, next) {
  // TODO: Reset User Password
  res.status(200).json({message: '/api/reset-password'});
});

module.exports = router;