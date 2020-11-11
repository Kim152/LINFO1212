const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema,model} = require('mongoose');


const userSchema = new Schema({
       user: String,
       password: String,
       nom: String,
       prenom: String,
       mail: String
});




userSchema.methods.generatepassword = async password => {
    const salt = await bcrypt.genSalt(8);
    return await bcrypt.hash(password, salt);
};

userSchema.methods.validatepassword = async function(password){
    return await bcrypt.compare(password, this.password);
}


module.exports = model('user',userSchema);