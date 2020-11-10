const passport = require("passport");
const express = require('express');
const app = express ();
//module.exports = (app, passport)

app.get('/',(req,res) =>{
    res.render('index.html');
});

app.get('/identification',(req,res)=>{
    res.render('identification.html',{
        message: req.flash('loginmessage')
    });
});

//app.post('identification', passport.authenticate(''))

app.post('/identification', passport.authenticate('local-signup',(req,res,next) =>{
    console.log(req.body);
    res.send('recevied')
}));