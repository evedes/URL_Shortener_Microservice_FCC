const express = require('express')
const path = require('path')
var router = express.Router()
var urlToShorten = require('../db/connection.js')
var lib = require('../lib/lib.js')

//ATTRIB STATIC PATH TO PUBLIC FOLDER
router.use('/', express.static(path.join(__dirname,'../public')))

//ATTRIB /s PATH TO SELF REDIRECTION
router.get('/s/', (req,res)=>{
    res.redirect(301,'https://dust-fountain.glitch.me/')
})

// GET DATA AND CREATE A NEW URL OR IF URL EXISTS SEND INFO ABOUT SHORTURL CREATED
router.route('/new/:url2Short(*)').get(lib.newUrl)

// USE SHORTENED URL
router.route('/s/:shortenedUrl').get(lib.redirectShortUrl)


module.exports = router