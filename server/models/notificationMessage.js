const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const notificationMessage = new Schema({
    messageRead: [Number],
    conversationId: { type: Schema.Types.ObjectId, refs: 'conversations', unique: true }
},
    { timestamps: true }
)
module.exports = mongoose.model('NotificationMessage', notificationMessage);