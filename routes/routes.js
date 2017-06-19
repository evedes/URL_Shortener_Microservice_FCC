const express = require('express')
const path = require('path')
var router = express.Router()
var urlToShorten = require('../db/connection.js')


//ATTRIB STATIC PATH TO PUBLIC FOLDER
router.use('/', express.static(path.join(__dirname,'../public')))


router.get('/s/', (req,res)=>{
    res.redirect(301,'https://dust-fountain.glitch.me/')
})

// GET DATA FROM URL
router.get('/new/:url2Short(*)', (req,res)=>{
    
    let url = req.params.url2Short
    let regEx1 = /^https?:\/\//
    let test = regEx1.test(url)
        
        if (test===true) {

            urlToShorten.findOne({Url: url}, (err,count)=>{
                if(err) return res.send('Error reading database')
                if(count===null) {

                    let shortUrl = Math.floor(Math.random()*10000).toString()
                    let data = new urlToShorten({Url: url, ShortUrl: shortUrl})
              
                    data.save((err,data)=>{
                        if(err) return console.error(err)
                    })
    
                    res.json({Url: data.Url, ShortUrl: data.ShortUrl})
                }
                else {
                    
                    res.json({Message: 'Url already exists!', Url: count.Url, ShortUrl: count.ShortUrl})
                }

            })                                
            
        }
        else {
            res.json({Message: 'Wrong url format, make sure you have a valid protocol and a real site.'})
        }
   
})

// USE SHORTENED URL
router.get('/s/:shortenedUrl', (req,res)=>{
    
    var shortenedUrl = req.params.shortenedUrl;
    
    urlToShorten.findOne({ShortUrl:shortenedUrl}, (err,count)=>{
        if(err) return res.send('Error reading database')
        
        if(count===null) {
            res.json({Message: 'Short URL doesn\'t exists!'})
        
        } else { 
            res.redirect(301,count.Url)
        } 
    })
})


module.exports = router