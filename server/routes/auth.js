const express = require('express');
const debug = require("debug")('sft2:auth-route');

// Controllers
const AuthController = require('../controllers/authController');

// Router
var router = express.Router();

// Register User
router.post('/api/register', AuthController.userRegister);

// Log in User
router.post('/api/login', AuthController.userLogin);

// Log User Out
router.post('/api/logout', AuthController.userLogout);

// Forgot User Password
router.post('/api/forgot-password', function (req, res, next) {
  // TODO: Forgot User Password
  res.status(200).json({message: '/api/forgot-password'});
  return;
});

// Reset User Password
router.post('/api/reset-password', function (req, res, next) {
  // TODO: Reset User Password
  res.status(200).json({message: '/api/reset-password'});
  return;
});

module.exports = router;