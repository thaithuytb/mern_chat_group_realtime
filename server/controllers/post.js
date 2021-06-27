const Posts = require('./../models/posts');

const postController = {
    // GET: /api/post 
    getAllMyPosts: async (req, res) => {
        const userId = req.userId;
        try {
            const posts = await Posts.find({userId}).select('-userId -__v');
            res.json({posts});
        } catch (error) {
            console.log(error.message);
        }
    },
    // POST: /api/posts
    postMyPost: async (req, res) => {
        const userId = req.userId;
        const { title, description } = req.body;
        const newPost = new Posts({title, description, userId});
        try {
            await newPost.save();
            res.json({
                title,
                description,
                userId,
            })
        } catch (error) {
            console.log(error.message);
        }       
    },
    //PUT: /api/post/:id
    putMyPost: async (req, res) => {
        const userId = req.userId;
        const _id = req.params.id;
        const { title, description } = req.body;
        try {
            const post = await Posts.findOne({userId});
            if (post) {
                const data = { title, description, userId };
                const newPost = await Posts.findOneAndUpdate({_id}, data, {
                    new: true
                }).select('-__v -userId');
                res.json({
                    success: true,
                    newPost,
                })
            } else {
                res.json({
                    success: false,
                    message: 'user has not any post',
                })
            }
        } catch (error) {
            console.log(error.message);
        }
    },
    //DELETE: /api/post/:id
    deleteMyPost: async (req, res) => {
        const userId = req.userId;
        const _id = req.params.id;
        try {
            const post = await Posts.findOne({userId});
            if (post) {
                const deletePost = await Posts.findOneAndDelete({_id});
                res.json({
                    success: true,
                    deletePost
                })
            } else {
                res.json({
                    success: false,
                    message: 'user has not any post',
                })
            }
        } catch (error) {
            console.log(error.message);
        }
    },

}

module.exports = postController;