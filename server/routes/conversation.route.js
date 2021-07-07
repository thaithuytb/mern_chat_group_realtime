const express = require('express');
const route = express.Router();
const conversationController = require('../controllers/conversation');
const verifyToken = require('./../middleware/verifyToken');

route.post('/', verifyToken , conversationController.postSingleConversation);
route.get('/', verifyToken, conversationController.getAllConversation);

module.exports = route;