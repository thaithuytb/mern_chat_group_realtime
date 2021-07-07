const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    message: { type: String },
    senderId: { type: Schema.Types.ObjectId, refs: 'users', unique: true },
    conversationId: { type: Schema.Types.ObjectId, refs: 'conversations', unique: true }
},
    { timestamps: true }
)

module.exports = mongoose.model('message', messageSchema);
/*
chưa biết tại sao nhưng mình bị mắc lối E11000 in mongoose
.........................................................
Cách giải quyết tạm thời: Vào mongoDb, xóa (drop) collection đó đi,
sau đó post lại daba khác là đc.
*/