const authRoutes = require('./auth.route');
const postsRoutes = require('./post.route');

const route = (app) => {
    app.use('/api/auth', authRoutes);
    app.use('/posts', postsRoutes);
}


module.exports = route;