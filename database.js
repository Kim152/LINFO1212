const mongoose = require('mongoose');

const data = 'mongodb+srv://kimberly:kawaii@cluster0.wtgk0.mongodb.net/<dbname>?retryWrites=true&w=majority'
mongoose.connect(data, {
  useNewUrlParser: true,useUnifiedTopology: true, useCreateIndex: true
})
  .then(db => console.log('DB connected'))