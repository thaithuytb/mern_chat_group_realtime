const jwt = require('jsonwebtoken');

const verifyToken = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_MYSECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log(error.message);
        res.sendStatus(403);
    }

}

module.exports = verifyToken;