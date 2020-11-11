const express = require('express');
const path = require('path'); //me ayuda a manejar las rutas del servidor 
const bcrypt = require('bcrypt');
const mongoose = require('mongoose'); //permet de manipuler mongo db
const passport = require('passport'); // permettre identifier un user
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const consolidate = require('consolidate');
const app = express ();

require('./WEB/passport/password')(passport);
require('./database')
const {url} = require('../LINFO1212/database');
const morgan = require('morgan');
const { Passport } = require('passport');
mongoose.connect(url,{ useNewUrlParser: true , useUnifiedTopology: true })
    .then(db => console.log('database connected'));

//require('./WEB/confi/database')(passport);

// configurations
app.use(express.static('WEB')) 
app.engine('html', consolidate.hogan)
app.set('views','./WEB/public')

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(session({
    secret: 'projet',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//routes
app.get('/',(req,res) =>{
    res.render('index.html');
});

app.get('/identification',(req,res)=>{
    res.render('identification.html');
});

app.get('/summit',(req,res) =>{
    res.render('Page2.html')
})

//app.post('identification', passport.authenticate(''))

app.post('/identification', passport.authenticate('local-signup',{
    successRedirect :'/index.html',
    failureRedirect: '/identification.html',
    passReqToCallback: true
}));

app.post('/identification', passport.authenticate('local-signin', {
    successRedirect: '/Page2.html',
    failureRedirect: '/idetification.html',
    failureFlash: true
  }));

// static files 
app.use(express.static('./WEB/public')) 

// server run 
app.listen(8080);