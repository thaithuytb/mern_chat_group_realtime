const NotificationMessageDb = require('../models/notificationMessage');

const addMessage = (data) => {
    return data.reduce((repo, cur) => {
        return [...repo, ++cur];
    }, []);
}

const notificationMessageController = {
    //POST :api/notificationMessage
    getAllNotificationMessage: async (req, res) => {
        const { listConversations } = req.body;
        const data = listConversations.reduce((repo, cur) => {
            return [...repo, {conversationId: cur}];
        }, [])
        try {
            const notificationMessage = await NotificationMessageDb.find({ $or : data}).select('-__v');
            res.json({
                success: true,
                notificationMessage
            })
        } catch (error) {
            console.log(error.message);
        }
    },
    //PUT :api/notificationMessage
    putNewNotify: async (req, res) => {
        const { conversationId} = req.body;

        try {
            const notifyMessage = await NotificationMessageDb.findOne({ conversationId });
            if (notifyMessage) {

                const { messageNotify } = notifyMessage;
                const newNotify = addMessage(messageNotify);

                const data = { messageNotify: newNotify, conversationId };

                const newNotificationMessage = await NotificationMessageDb.findOneAndUpdate({conversationId }, data, {
                    new: true
                }).select('-__v');
                res.json({
                    success: true,
                    newNotificationMessage,
                })
            } else {
                res.json({
                    success: false,
                })
            }
        } catch (error) {
            console.log(error.message);
        }
    },
    //GET :api/notificationMessage/:conversationId
    getNotifycationMessage: async (req, res) => {
        const { conversationId } = req.params;
        try {
            const notificationMessage = await NotificationMessageDb.findOne({conversationId});
            res.json({
                success: true,
                notificationMessage
            })
        } catch (error) {
            console.log(error.message);
        }
    },
    //PUT :api/notificationMessage/:conversationId
    putNotificationMessage: async (req, res) => {
        const { numberOfUserInNotifyMessage } = req.body;
        const { conversationId } = req.params;

        try {
            const notifyMessage = await NotificationMessageDb.findOne({ conversationId });
            if (notifyMessage) {
                const { messageNotify } = notifyMessage;
                const arrData = messageNotify.reduce((repo, cur, index) => {
                    return (numberOfUserInNotifyMessage == index) ?  [...repo, 0] : [...repo, cur];
                } ,[]);
              
                const data = { messageNotify: arrData, conversationId };

                const newNotificationMessage = await NotificationMessageDb.findOneAndUpdate({conversationId }, data, {
                    new: true
                }).select('-__v');
                res.json({
                    success: true,
                    newNotificationMessage,
                })
            } else {
                res.json({
                    success: false,
                })
            }
        } catch (error) {
            console.log(error.message);
        }

    },
   
}

module.exports = notificationMessageController;
