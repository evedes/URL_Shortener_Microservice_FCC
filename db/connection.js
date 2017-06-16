const mongoose = require('mongoose')


mongoose.connect('mongodb://' + process.env.DB_USER +':' + process.env.DB_PASS + process.env.DB_HOST)
var db = mongoose.connection
db.on('error',console.error.bind(console,'connection error:'))
db.once('open', ()=>{
    console.log('\nHey guys! We\'re connected!\n')
})

// Schema Definitions
var urlSchema = mongoose.Schema({
    Url: String,
    ShortUrl: String
})

//Define module
var urlToShorten = mongoose.model('urlToShorten', urlSchema,'urlCollection')

module.exports = urlToShorten