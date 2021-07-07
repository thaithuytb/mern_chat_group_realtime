const express = require('express');
const route = express.Router();
const messageController = require('../controllers/message');
const verifyToken = require('../middleware/verifyToken');

route.get('/:conversationId', verifyToken, messageController.getAllMessageInConversation);
route.post('/:conversationId', verifyToken, messageController.postMessage);

module.exports = route;