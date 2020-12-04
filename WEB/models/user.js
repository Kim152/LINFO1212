
const bcrypt = require('bcrypt');
const {Schema,model} = require('mongoose');


const userSchema = new Schema({
       user: {type:String, required: true, unique: true},
       password: {type:String,required: true},
       nom: {type:String,required: true},
       prenom: {type:String,required: true},
       mail: {type:String,required: true},
});




userSchema.methods.generatepassword = async password => {
    const salt = await bcrypt.genSalt(8);
    return await bcrypt.hash(password, salt);
};

userSchema.methods.validatepassword = async function(password){
    return await bcrypt.compare(password, this.password);
}


module.exports = model('User',userSchema);