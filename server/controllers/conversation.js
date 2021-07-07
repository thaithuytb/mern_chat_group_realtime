const ConversationsDb = require('../models/conversation');
const conversationController = {
    //GET :api/conversations
    getAllConversation: async (req, res) => {
        const userId = req.userId;
        try {
            const conversations = await ConversationsDb.find({
                members: { $all : [userId]}
            })
            res.json({
                success: true,
                conversations
            })
            
        } catch (error) {
            console.log(error.message);
        }
    },
    //POST :api/conversations
    postSingleConversation: async ( req, res ) =>  {
        const data = Object.values(req.body);
        const newConversation = new ConversationsDb({ members: data});
        try {
            await newConversation.save();
            res.json({
                success: true,
                newConversation
            })
        } catch (error) {
            console.log(error.message);
        }
    },
   
}

module.exports = conversationController;
