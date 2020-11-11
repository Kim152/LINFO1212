const inCt ={};

const Incident = require('../models/incidents')

inCt.rendernote = (req,res) =>{
    res.render('Page2.html')
}
inCt.create = async(req,res) =>{
    const {title,description} = req.body;
    const newI = new Incident({title,description});
    await newI.save();
    res.send('new')
}

//all
inCt.incidents =(req, res) =>{
    res.render('index.html')
}
module.exports = inCt