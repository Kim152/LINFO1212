const {Schema , mode1} = require('mongoose');
const { model } = require('./user');

const Incident = new Schema({
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

 module.export = model('incident',Incident);