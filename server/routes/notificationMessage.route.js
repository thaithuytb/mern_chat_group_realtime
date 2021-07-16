const express = require('express');
const route = express.Router();
const verifyToken = require('../middleware/verifyToken');
const notificationMessageController = require('../controllers/notificationMessage');
// const UsersDb = require('./../models/users');

route.get('/:conversationId', verifyToken, notificationMessageController.getNotifycationMessage);
route.put('/:conversationId', verifyToken, notificationMessageController.putNotificationMessage);

module.exports = route;