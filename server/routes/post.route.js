const express = require('express');
const router = express.Router();
const postController = require('./../controllers/post');
//import middleware
const verifyToken = require('../middleware/verifyToken');


router.get('/', verifyToken, postController.getAllMyPosts);
router.post('/', verifyToken, postController.postMyPost );
router.put('/:id', verifyToken, postController.putMyPost );
router.delete('/:id', verifyToken, postController.deleteMyPost );

module.exports = router;