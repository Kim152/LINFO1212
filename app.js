const express = require('express');
const path = require('path'); //me ayuda a manejar las rutas del servidor 
const bcrypt = require('bcrypt');
const mongoose = require('mongoose'); //permet de manipuler mongo db
const passport = require('passport'); // permettre identifier un user
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const app = express ();
const {url} = require('.database');
mongoose.connect(url,{
    
})
// configurations
app.use(express.static('WEB')) 


// Middlewares


//routes

// static files 

// server run 
app.listen(8080);