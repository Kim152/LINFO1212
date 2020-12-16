const {Schema, model} = require('mongoose');
const { create } = require('./user');


const ChatSchema = new Schema({
    message:{
        type: String,
        require: true
    },
    created: {type:Date, default: Date.now}
    });
module.exports = model('Chat',ChatSchema);