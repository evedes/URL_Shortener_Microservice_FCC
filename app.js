//EXPRESS AND NODE REQUIREMENTS
const express = require('express')
const app = express()


// .ENV VAR DEFINITION (env var for db connection)
const dotenv = require('dotenv')
dotenv.load()


// Var Definition
const port = process.env.PORT || 8080
const route = require('./routes/routes.js')

//Database Requirements and Connection
const mongoose = require('mongoose')
var urlToShorten = require('./db/connection.js')

mongoose.connect('mongodb://' + process.env.DB_USER +':' + process.env.DB_PASS + process.env.DB_HOST)
var db = mongoose.connection
db.on('error',console.error.bind(console,'connection error:'))
db.once('open', ()=>{
    console.log('\nHey guys! We\'re connected!\n')
})


// APP USE
app.use('/', route)


// LISTEN (START APP WITH NODE APP.js)
app.listen(port, ()=>{
    console.log('\n' + 'Server listening on port: ' + port + '\n')
})


