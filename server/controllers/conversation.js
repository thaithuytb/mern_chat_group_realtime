const ConversationsDb = require('../models/conversation');
const NotificationMessageDb = require('../models/notificationMessage');

const arrBeginNotifi = (data) => {
    let dataNotification = new Array(data.length);
    for ( let i = 0; i < data.length; ++i ) {
        dataNotification[i] = 0;
    }   
    return dataNotification;
}

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
        const dataNotification = arrBeginNotifi(data);
        const newConversation = new ConversationsDb({ members: data});
        try {
            const newConv = await newConversation.save();
            if (newConv) {
                const newNotificationMessage = new NotificationMessageDb({ messageNotify: dataNotification,conversationId: newConv._id});
                await newNotificationMessage.save();
                res.json({
                    success: true,
                    newConversation,
                    newNotificationMessage,
                })
            }
        } catch (error) {
            console.log(error.message);
        }
    },
   
}

module.exports = conversationController;
