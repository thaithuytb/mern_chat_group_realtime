const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: {
        type: String,
        unique: true,
    },
    name: {
        type: String,
        unique: true,
    },
    password: {
        type: String
    },
    createDate: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model('User', userSchema);