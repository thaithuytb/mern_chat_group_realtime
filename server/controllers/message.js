const MessagesDb = require('../models/message');
const messageController = {
    //GET :api/messages/:conversationsId
    getAllMessageInConversation: async (req, res) => {
        const { conversationId } = req.params;
        try {
            messages = await MessagesDb.find({conversationId});
            res.json({
                success: true,
                messages
            })
        } catch (error) {
            console.log(error.message);
        }
    },
    //POST :api/messages/:conversationId
    postMessage: async (req, res) => {
        const senderId = req.userId;
        const { conversationId } = req.params;
        const { message } = req.body;
        try {
            const newMessage = await MessagesDb({message, senderId, conversationId});
            newMessage.save();
            res.json({
                success: true,
                newMessage
            })
        } catch (error) {
            console.log(error.message);
        }

    },
   
}

module.exports = messageController;
