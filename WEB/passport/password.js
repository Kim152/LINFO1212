//password
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


const User = require('../models/user');

    passport.serializeUser ((user,done) =>{
        done(null, user.id);
    });
    
    passport.deserializeUser(async (id, done) => {
        const user = await User.findById(id);
        done(null, user);
    });

passport.use('login', new LocalStrategy({
    usernameField: 'user',
    passwordField : 'password',
    passReqToCallback: true
}, async (req,user,password,done) => {
    const newUser = new User();
    newUser.user = user;
    newUser.password = newUser.generatepassword(password);
    await newUser.save();
    done(null,newUser);
}));
