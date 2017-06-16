//EXPRESS AND NOVE REQUIREMENTS
const express = require('express')
const app = express()
const path = require('path')
const dotenv = require('dotenv')
dotenv.load()
// VAR DEFINITION
const port = process.env.PORT || 8080
//Database Requirements and Connection
const mongoose = require('mongoose')
var urlToShorten = require('./db/connection.js')
//ATTRIB STATIC PATH TO PUBLIC FOLDER
app.use('/', express.static(path.join(__dirname,'public')))


app.get('/s/', (req,res)=>{
    res.redirect(301,'https://dust-fountain.glitch.me/')
})

// GET DATA FROM URL
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

// USE SHORTENED URL
app.get('/s/:shortenedUrl', (req,res)=>{
    var shortenedUrl = req.params.shortenedUrl;
    
    urlToShorten.findOne({ShortUrl:shortenedUrl}, (err,data)=>{

        if(err) return res.send('Error reading database')

        res.redirect(301,data.Url);

    })
})


// Server in listening mode
app.listen(port, ()=>{
    console.log('\n' + 'Server listening on port: ' + port + '\n')
})


