const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String },
    description: { type: String },
    userId: { type: Schema.Types.ObjectId , refs: 'users'},
    createDate: { type: Date, defaulte: Date.now()}
})

module.exports = mongoose.model('Post', postSchema);