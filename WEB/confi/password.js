//password
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const { use } = require('passport');
const User = require('../app/models/user.js');

module.exports = function(passport){
    passport.serializeUser(function(user,done){
        done(null, user.id);
    });

    passport.deserializeUser(function(err,user){
        User.findById(id,function(err,user){
            done(err,user)
        });
    });

    //singup
    passport.use('local-signup', new LocalStrategy({
        usernameField :'user',
        passwordField : 'password',
        passReqToCallback: true
    },
    function (req, user,password,done){
        User.findOne({'local.user': user}, function(err,user){
            if (err) {return done(err);}
            if (user){
                return done(null,false, req.flash('The user is already'));
            } else{
                var newUser = new User();
                newUser.local.user = user;
                newUser.local.password = newUser.generateHash(password)
                newUser.save(function(err){
                    if (err) {throw err;}
                    return done(null, newUser);
                });
            
            }
        })
    }));
    }

    //loging
    passport.use('local-login', new LocalStrategy({
        usernameField :'user',
        passwordField : 'password',
        passReqToCallback: true
    },
    function (req, user,password,done){
        User.findOne({'local.user': user}, function(err,user){
            if (err) {return done(err);}
            if (!user){
                return done(null,false, req.flash('No user fond'))
            } 
            if (!user.validatePssword(password)){
                return done(null, false, req.flash('wrong password'));
            }
            return done(null, user);
        });
    }));