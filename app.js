const express = require('express');
const path = require('path'); //me ayuda a manejar las rutas del servidor  //permet de manipuler mongo db
const passport = require('passport'); // permettre identifier un user
const bodyParser = require('body-parser');
const consolidate = require('consolidate');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const morgan = require('morgan')
const multer = require('multer') //modulo para subir imagenes
const {format} = require('timeago.js')


//Init
const app = express ();

require('./database')



//configurations

app.use(express.static('./WEB/public')) 
app.engine('html', consolidate.hogan)
app.set('views','./WEB/public')
app.set('view engine', 'ejs')
require('../LINFO1212/WEB/passport/password')


//middlewares
app.use(express.urlencoded({extended:false}));

const storage = multer.diskStorage({
  destination: path.join(__dirname,'/WEB/public/news/img'),
  filename: (req,file,cb,filename) =>{
    cb(null, file.originalname);
  }
});
app.use(multer({storage: storage}).single('image'));
app.use(morgan('dev'))
app.use(cookieParser());
app.use(bodyParser.urlencoded());
app.use(session({
    secret: 'proyecto',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//time
app.use((req,res,next)=>{
  app.locals.format = format;
  next();
})

//models

const Incident = require('./WEB/models/incidents');
const { notEqual } = require('assert');
const { Strategy, use } = require('passport');

//routes
app.get('/', async(req,res) =>{
  const data = await Incident.find();
  const userdata = await User.find();
  res.render('index',{
    data });
});


//routesinsidents

app.get('/new',(req,res) =>{
    res.render('Page2');
})

app.post('/newincident', async(req,res) =>{
    const newNote = new Incident(req.body);
    newNote.filename = req.file.filename;
    newNote.path = './news/img/' + req.file.filename;
    newNote.create_at = req.file.create_at
    await newNote.save();
    res.redirect('/');
    
});


app.get('/identification',(req,res) =>{
    res.render('identification');
})

app.post('/identification', async(req,res) =>{
    const {user,password,nom,prenom,mail} = req.body;
    const newUser = new User({user,password,nom,prenom,mail});
    newUser.passport = await newUser.generatepassword(password);
    console.log(newUser)
    await newUser.save();
    res.render('login')
})
//usermodel
const User = require('./WEB/models/user');

//use passport
const LocalStrategy = require('passport-local').Strategy; //password

passport.use('login',new LocalStrategy({ 
    usernameField: 'user',//atraves de que dato se identifica 
    passportField: 'password'
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
    successRedirect: '/',
    failureRedirect: '/identification'
}));

//global variable

app.use((req,res,next)=>{
  res.locals.userid = req.user || null;
  next();
})

// static files 

// server run 
app.listen(8080);