const {Schema, model} = require('mongoose');
const { create } = require('./user');


const IncidentSchema = new Schema({
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    filename:{
        type: String,
        require: true
    },
    autor:{
        type: String,
        required: true
    },
    create_at: {type: Date, default: Date.now()
    },
    path: {type: String},
    });
module.exports = model('Incident',IncidentSchema);