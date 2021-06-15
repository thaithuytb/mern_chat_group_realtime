const express = require('express');
const route = express.Router();
const authController = require('../controllers/auth');

route.post('/login', authController.authLogin);
route.post('/register', authController.authRegister);

module.exports = route;