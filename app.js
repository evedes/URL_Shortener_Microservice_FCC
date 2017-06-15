//Express and Node Requirements
const express = require('express')
const app = express()
const path = require('path')


//Database Requirements and Connection
const mongoose = require('mongoose')
mongoose.connect('mongodb://user:pass@ds127892.mlab.com:27892/urlshortener_fcc')
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

// Compile Schema into a model
var urlToShorten = mongoose.model('urlToShorten', urlSchema,'urlCollection')


//Var definition
const port = process.env.PORT || 8080

// 

//Use static path for public
app.use('/', express.static(path.join(__dirname,'public')))


//Get data from Url
app.get('/new/:url2Short(*)', (req,res)=>{
    
    let url = req.params.url2Short
    let regEx1 = /^https?:\/\//
    let test = regEx1.test(url)
        
        if (test===true) {
           
                             
            let shortUrl = Math.floor(Math.random()*10000).toString()
            let data = new urlToShorten({Url: url, ShortUrl: shortUrl})
    
            data.save((err,data)=>{
                if(err) return console.error(err)
                })
    
            res.json(data)
        }
        else {
            res.json('Wrong url format, make sure you have a valid protocol and a real site.')
        }
   
})

app.get('/s/:shortenedUrl', (req,res)=>{
    var shortenedUrl = req.params.shortenedUrl;
    
    urlToShorten.findOne({ShortUrl:shortenedUrl}, (err,data)=>{
        console.log(shortenedUrl)
        if(err) return res.send('Error reading database')

        res.redirect(301,data.Url);

    })
})


// Server in listening mode
app.listen(port, ()=>{
    console.log('\n' + 'Server listening on port: ' + port + '\n')
})


