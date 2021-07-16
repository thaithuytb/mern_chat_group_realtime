const NotificationMessageDb = require('../models/notificationMessage');

const notificationMessageController = {
    //GET :api/notificationMessage/:conversationId
    getNotifycationMessage: async (req, res) => {
        const { conversationId } = req.params;
        try {
            notificationMessage = await NotificationMessageDb.findOne({conversationId});
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
        const { numberOfUserInNotifyMessage, numberMessageRead } = req.body;
        console.log(req.body);
        const { conversationId } = req.params;

        try {
            const notifyMessage = await NotificationMessageDb.findOne({ conversationId });
            if (notifyMessage) {

                const { messageRead } = notifyMessage;

                let arrData = [...messageRead];
                arrData[numberOfUserInNotifyMessage] = numberMessageRead;

                const data = { messageRead: arrData, conversationId };

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
