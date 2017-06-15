//Express and Node Requirements
const express = require('express')
const app = express()
const path = require('path')

//Var definition
const port = process.env.PORT || 8080

//Database Requirements and Connection
const MongoClient = require('mongodb').MongoClient
MongoClient.connect('mongodb://user:pass@ds127892.mlab.com:27892/urlshortener_fcc', (err,db)=>{
    if(err) throw err
})

//Use static path for public
app.use('/', express.static(path.join(__dirname,'public')))


//Get data from Url
app.get('/new/:url2Short(*)', (req,res)=>{
   
    let url = req.params.url2Short
    let regEx1 = /https?:\/\//
    let parsedUrl=url.replace(regEx1,'')
    let shortUrl = Math.floor(Math.random()*10000).toString();
    
    let data = {
        url: parsedUrl,
        shorturl: shortUrl
    }

    var insertData = (db,callback)=>{
        db.collection('url').insertOne(data)
    }


    res.json(data)
    
})

app.listen(port, ()=>{
    console.log('Server listening on port: ' + port)
})
