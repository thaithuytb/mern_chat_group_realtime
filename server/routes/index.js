const authRoutes = require('./auth.route');
const postsRoutes = require('./post.route');
const conversationRoutes = require('./conversation.route');
const messagesRoutes = require('./message.route');
const usernameRoutes = require('./username.route');
const notificationMessage = require('./notificationMessage.route');

const route = (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/posts', postsRoutes);
    app.use('/api/conversations', conversationRoutes);
    app.use('/api/messages', messagesRoutes);
    app.use('/api/username', usernameRoutes);
    app.use('/api/notificationMessage', notificationMessage);
}


module.exports = route;