
const bcrypt = require('bcrypt');
const {Schema,model} = require('mongoose');


const userSchema = new Schema({
       user: {type:String},
       password: {type:String},
       nom: {type:String},
       prenom: {type:String},
       mail: {type:String},
});




userSchema.methods.generatepassword = async password => {
    const salt = await bcrypt.genSalt(8);
    return await bcrypt.hash(password, salt);
};

userSchema.methods.validatepassword = async function(password){
    return await bcrypt.compare(password, this.password);
}


module.exports = model('User',userSchema);