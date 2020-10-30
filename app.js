const express = require('express');
var consolidate = require('consolidate')
const app = express ();

app.engine('html',consolidate.hogan)
app.set('views','WEB')

app.get('/question',function(req,res,next){
    res.render('index.html',{year:req.query.year});
});

app.get('/nouvelincident',function(req,res,next){
    res.render('Page2.html');
});

app.get('/registre',function(req,res,next){
    res.render('identification.html');
});

app.use(express.static('WEB'))
app.listen(8080);