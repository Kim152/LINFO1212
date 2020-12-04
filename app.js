const express = require('express');
const path = require('path'); //me ayuda a manejar las rutas del servidor  //permet de manipuler mongo db
const passport = require('passport'); // permettre identifier un user
const bodyParser = require('body-parser');
const consolidate = require('consolidate');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash')
const morgan = require('morgan')
const multer = require('multer') //modulo para subir imagenes
const {format} = require('timeago.js')


//Init
const app = express ();

require('./database')



//configurations


app.engine('html', consolidate.hogan)
app.set('views','./WEB/public')
app.set('view engine', 'ejs')
app.use(express.static('./WEB/public')) 



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
app.use(cookieParser('misecreto'));
app.use(bodyParser.urlencoded());
app.use(session({
    secret: 'proyecto',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//time
app.use((req,res,next)=>{
  res.locals.text = req.flash('text');
  res.locals.msg = req.flash('msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});
app.use((req,res,next)=>{
  app.locals.format = format;
  next();
})

//models

const Incident = require('./WEB/models/incidents');
const { notEqual } = require('assert');
const { Strategy, use } = require('passport');

//routes
app.get('/', checkAuthenticated,async(req,res) =>{
  const data = await Incident.find();
  res.render('index',{
    data,
    name  : req.user}
    );
});
// contact 
app.get('/contact', checkAuthenticated,async(req,res) =>{
  res.render('contact');
})

//routesinsidents

app.get('/add', checkAuthenticated,async(req,res) =>{
    res.render('Page2',{name  : req.user});
})

app.post('/add', async(req,res) =>{

    const newNote = new Incident(req.body);
    newNote.filename = req.file.filename;
    newNote.path = './news/img/' + req.file.filename;
    newNote.create_at = req.file.create_at;
    newNote.autor = req.user
    await newNote.save();
    console.log(newNote)
    req.flash('msg','Incident add successfully')
    res.redirect('/');
    
});


app.get('/identification',(req,res) =>{
  const errors = [];
  res.render('identification',{
    errors});
})

app.post('/identification', async(req,res,done) =>{
  const {user,password,nom,prenom,mail} = req.body;
  const errors = [];
  const username =  await User.findOne({user:user});
  if (username){
    errors.push({text:"The user is already use"})
  }
  if (!user) {
    errors.push({text:"Please Write a Uset."});
  }
  if (!password) {
    errors.push({text:"Please Write a Password"});
  }
  if (password < 8){
    errors.push({text:"Invalid password. Your password must be at least 8 characters"})
  }
  if (!nom) {
    errors.push({text:"Please Write a Nom"});
  }
  if (!prenom) {
    errors.push({text:"Please Write a Prenom"});
  }
  if (!mail) {
    errors.push({text:"Please Write a E-mail"});
  }
  if (errors.length > 0) {
    console.log(errors)
    res.render("identification", {
      errors,
      user,
      mail
    });
  } else{
    const newUser = new User({user,password,nom,prenom,mail});
    newUser.passport = await newUser.generatepassword(password);
    await newUser.save();
    req.flash('msg', 'Welcome');
    console.log('msg')
    res.redirect('/start');
  }
});

app.get('/start', (req,res)=>{
  res.render('start')
});
//usermodel
const User = require('./WEB/models/user');
const { text } = require('body-parser');
const { send } = require('process');
const user = require('./WEB/models/user');
const { db } = require('./WEB/models/user');

//use passport
const LocalStrategy = require('passport-local').Strategy; //password

passport.use('login', new LocalStrategy({ 
    usernameField: 'user',//atraves de que dato se identifica 
  }, async (user, password, done) => {
    const errors = [];
    // Match user to User
    const check = await User.findOne({user : user});
    if (!check) {
      errors.push('Not User found.')
      return done(null, false, errors);
      
    } else {
      // match password
      const match = await User.findOne({password: password});
      if(match) {
        return done(null, user);
      } else {
        errors.push('Incorrect Password.')
        return done(null, false, errors);
      }
    }
    
  }));
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((user, done) => {
   done(null,user)
  });

  function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
  
    res.render('welcome')
  }


app.post('/login',passport.authenticate('login',{

    successRedirect: '/',
    failureRedirect:'/identification',
    failureFlash: true
    
}));
 //-------------- si n'est pas encore regristre envoi dans une pager pour faire loging apres avoir cree une compte 
 app.post('/start', passport.authenticate('login',{
  successRedirect: '/',
  failureRedirect:( '/identification')
}));

// seach

db.collection("incidents").createIndex[{subject: "text"}]

/**app.post('/seach',async(req,res,next) =>{
  try{
    const seach = await db.collection("incidents").find( { $text: { $search: "kim" } } )
    seach.then (function(resukt){
      console.log(resukt)
    })
  }catch (error){
      res.send('Not found')
    }
})**/

//global variable

const seach = db.collection("incidents").find( { $text: { $search: "kim" } } )
seach.then (function(resukt){
  console.log(resukt)});
// static files 

// server run 
app.listen(8080);