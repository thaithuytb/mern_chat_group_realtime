const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const conversationSchema = new Schema({
    members: [String]
},
    { timestamps: true }
)
module.exports = mongoose.model('Conversation', conversationSchema);