const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema


module.exports = modele('User', userSchema);
const userSchema = new mongoose.Schema({
      local:{
       user: String,
       password: String,
       nom: String,
       prenom: String,
       email: String
    },
    local1:{
        user: String,
        password: String,
    }
});

userSchema.methods.generateHash = function (password){
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validatepassword = function(password){
    return bcrypt.compareSync(password, this.local1.password);
}

module.exports = mongoose.model('User', userSchema);