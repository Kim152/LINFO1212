//password
const passport = require('passport');
const { emit } = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;


const User = require('../models/user');

module.exports = function (passport) {
    passport.serializeUser(function(user,done){
        done(null, user.id);
    });
    
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
          done(err, user);
        });
      });

passport.use('local-signup', new LocalStrategy({
    usernameField: 'user',
    passwordField : 'password',
    nomField: 'nom',
    prenomField: 'prenom',
    mailField: 'mail',
    passReqToCallback: true
}, async (req,user,password,nom,prenom,mail,done) => {
    const newUser = new User();
    newUser.user = user;
    newUser.password = newUser.generate(password);
    console.log(newUser)
    await newUser.save();
    done(null,newUser);
}));
}