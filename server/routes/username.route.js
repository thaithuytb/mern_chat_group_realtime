const express = require('express');
const route = express.Router();
const verifyToken = require('../middleware/verifyToken');
const UsersDb = require('./../models/users');

route.get('/', verifyToken, async (req, res) => {
    // const userId = req.userId;
    // const listId = req.body.members;
    // const dataId = listId.reduce((data, cur) => {
    //     return (cur === userId) ? data : data.push({_id: cur});
    // }, []);
    // console.log(dataId);
    // try {
    //     const listUsername = await UsersDb.find({ $or:dataId});
    //     res.json({
    //         success: true,
    //         listUsername
    //     })
    // } catch (error) {
    //     console.log(error.message);
    // }
    try {
        const listUser = await UsersDb.find().select('-password -__v -username -createDate');
        res.json({
            success: true,
            listUser
        })
    } catch (error) {
        console.log(error.message);
    }
});

module.exports = route;