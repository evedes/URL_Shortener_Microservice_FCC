const express = require('express')
const app = express()
const path = require('path')
const port = process.env.PORT || 8080

app.use('/', express.static(path.join(__dirname,'public')))

app.get('/new/:url2Short(*)', (req,res)=>{
   
    let url = req.params.url2Short
    let regEx1 = /http?:\/\//
    let parsedUrl=url.replace(regEx1,'')
    let shortUrl = Math.floor(Math.random()*10000)
    
    res.json({url: parsedUrl, shorturl: shortUrl})
    
})

app.listen(port, ()=>{
    console.log('Server listening on port: ' + port)
})
