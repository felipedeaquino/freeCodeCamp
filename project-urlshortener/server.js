require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
var bodyParser = require('body-parser')
const dns = require('dns')
const mongo = require('mongodb')
const mongoose = require('mongoose')

var Schema = mongoose.Schema

const connect = process.env['MONGO_URI']
var database = mongoose.connect(connect, { useNewUrlParser: true })

// DB Modelling

var urlSchema = new Schema({
    original_url:  {type: String, required: true},
    suffix: String,
    short_url: String
  })

const Url = mongoose.model('Url', urlSchema)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json)

// Basic Configuration

const port = process.env.PORT || 3000

app.use(cors())

app.use('/public', express.static(`${process.cwd()}/public`))

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html')
})

// Actual Microsevice

function suffix() {
  const suffixLength = 8
  return Math.random().toString(16).substr(2, suffixLength)
}
let suffixGenerated = suffix();

//You can POST a URL to /api/shorturl and get a JSON response with original_url and short_url properties.
app.post('/api/shorturl', (req, res) => {
  console.log(req.query)
  let originalUrl = req.body.url;
  let suffix = suffixGenerated;
  
//If you pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain { error: 'invalid url' }
  let url = originalUrl;
  var regexp = new RegExp(/^(http|https):\/\/[^ "]+$/);
  if (regexp.test(url) === false) {
    res.json( {
      error: 'invalid url'
    } )
  } else {
    res.json( { 
    original_url : originalUrl, 
    short_url : suffix 
    } )
  }

  let newUrl = new Url({
    original_url: originalUrl,
    suffix: suffix,
    short_url: (__dirname + "/api/shorturl/" + suffix)  
  })
  
  newUrl.save(error => {
    if(error) return console.log(error);
  })
})

app.get('/api/shorturl/:suffix', (req, res) => {
  let providedSuffix = req.params.suffix;
  Url.find({ suffix: providedSuffix }).then(foundUrls => {
    let redirectTo = foundUrls[0];
    res.redirect(redirectTo.original_url);
  })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
