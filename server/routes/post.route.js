const express = require('express');
const router = express.Router();
//import middleware
const verifyToken = require('../middleware/verifyToken');


router.post('/', verifyToken, (req, res) => {
    const userId = req.userId;
    res.json({userId});
})

module.exports = router;