const express = require('express');
const route = express.Router();
const authController = require('../controllers/auth');
const verifyToken = require('./../middleware/verifyToken');

route.post('/login', authController.authLogin);
route.post('/register', authController.authRegister);
route.get('/', verifyToken, authController.checkAndVerifyToke);

module.exports = route;