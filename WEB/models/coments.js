const {Schema, model} = require('mongoose');
const { create } = require('./user');


const CommentSchema = new Schema({
    description:{
        type: String,
        require: true
    },
    autor :{
        type: String,
        require: true 
    },
    userid :{
        type: String
    }
    });
module.exports = model('Comment',CommentSchema);