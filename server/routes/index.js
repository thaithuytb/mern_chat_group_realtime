const authRoutes = require('./auth.route');


const route = (app) => {
    app.use('/api/auth', authRoutes);
}


module.exports = route;