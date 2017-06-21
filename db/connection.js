const mongoose = require('mongoose')

// Schema Definitions
var urlSchema = mongoose.Schema({
    Url: String 
})

//Define model
var urlToShorten = mongoose.model('urlToShorten', urlSchema,'urlCollection')

module.exports = urlToShorten

