const {Schema, model} = require('mongoose');


const IncidentSchema = new Schema({
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    autor:{
        type: String,
        require: true
    }
    },{
        timestamps: true 
})
module.exports = model('Incident',IncidentSchema);