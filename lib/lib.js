
var urlToShorten = require('../db/connection.js')


module.exports = {

    newUrl: (req,res)=>{
    
    let url = req.params.url2Short
    let regEx1 = /^https?:\/\//
    let test = regEx1.test(url)
        
        if (test===true) {

            urlToShorten.findOne({Url: url}, (err,count)=>{
                if(err) return res.send('Error reading database')
                if(count===null) {

                    // let shortUrl = Math.floor(Math.random()*10000).toString()
                    let data = new urlToShorten({Url: url})
              
                    data.save((err,data)=>{
                        if(err) return console.error(err)
                    })
    
                    res.json({Url: data.Url, ShortUrl: data._id})
                }
                else {
                    
                    res.json({Message: 'Url already exists!', Url: count.Url, ShortUrl: count._id})
                }

            })                                
            
        }
        else {
            res.json({Message: 'Wrong url format, make sure you have a valid protocol and a real site.'})
        }
},
   

    redirectShortUrl: (req,res)=>{
    
    var shortenedUrl = req.params.shortenedUrl;
    
    urlToShorten.findOne({_id:shortenedUrl}, (err,count)=>{
    
        if(err) return res.send('ShorUrl is Non Existent')
            res.redirect(301,count.Url)
        })

    }
}