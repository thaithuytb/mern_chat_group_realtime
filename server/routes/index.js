const authRoutes = require('./auth.route');
const postsRoutes = require('./post.route');
const conversationRoutes = require('./conversation.route');
const messagesRoutes = require('./message.route');

const route = (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/api/posts', postsRoutes);
    app.use('/api/conversations', conversationRoutes);
    app.use('/api/messages', messagesRoutes);
}


module.exports = route;