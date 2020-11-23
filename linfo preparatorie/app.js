const express = require('express');
const path = require('path'); //me ayuda a manejar las rutas del servidor 
const bcrypt = require('bcrypt');
const mongoose = require('mongoose'); //permet de manipuler mongo db
const passport = require('passport'); // permettre identifier un user
const bodyParser = require('body-parser');
const consolidate = require('consolidate');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
//Init
const app = express ();

require('./database')
//configurations
app.use(express.static('./WEB/public')) 
app.engine('html', consolidate.hogan)
app.set('views','./WEB/public')

//middlewares
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(session({
    secret: 'projet'
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//models

const Incident = require('./WEB/models/incidents');
const { notEqual } = require('assert');
const { Strategy, use } = require('passport');

//routes
app.get('/index',(req,res)=>{
  res.render('index.html')
})


app.get('/identification',(req,res)=>{
    res.render('identification.html',{
        message: req.flash('loginmessage')
    });
});

//routesinsidents

app.get('/incident',(req,res) =>{
    res.render('Page2.html');
})

app.post('/newincident', async(req,res) =>{
    const{title,description} = req.body;
    const newNote = new Incident({title,description})
    console.log(newNote)
    await newNote.save()
    const data = await Incident.find();
    res.render('index.html',{data});
})
//user


app.get('/user',(req,res) =>{
    res.render('identification.html');
})

app.post('/identification', async(req,res) =>{
    const {user,password,nom,prenom,mail} = req.body;
    const newUser = new User({user,password,nom,prenom,mail});
    newUser.passport = await newUser.generatepassword(password);
    console.log(newUser)
    await newUser.save();
    res.redirect('/user')
})
//usermodel
const User = require('./WEB/models/user')
//use passport
const LocalStrategy = require('passport-local').Strategy;

passport.use('login',new LocalStrategy({
    usernameField: 'user'
  }, async (user, password, done) => {
    // Match Email's User
    const check = await User.findOne({user: user});
    if (!check) {
      return done(null, false, { message: 'Not User found.' });
    } else {
      
      const match = await User.findOne({password: password});
      if(match) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'Incorrect Password.' });
      }
    }
  }));
passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
   done(null,user)
  });

app.post('/login',passport.authenticate('login',{
    successRedirect: '/index',
    failureRedirect: '/identification'
}));

// static files 
app.use(express.static('./WEB/public')) 

// server run 
app.listen(8080);