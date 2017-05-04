const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const request = require('request')
const async = require('async')

const {DATABASE_URL, PORT} = require('./config')
const {getLinks, carBuilderInfo} = require('./scraper')
const app = express()
app.use(bodyParser.json())

request('https://boulder.craigslist.org/search/cto?query=honda', (err, res, html)=>{
  let hrefs = getLinks(html)
  // console.log(hrefs)

  async.map(hrefs, getCars, (err, results) => {
    results.save(err => {

    });
  });
})

function getCars(url, cb){
  request(url, (err, res, html)=>{
    cb(err, carBuilderInfo(html))
  })
}

app.get('/cars', (req, res)=>{
  
})
app.post('/blog-posts', (req, res)=>{

})
app.put('/blog-posts/:id', (req, res)=>{

})
app.delete('/blog-posts/:id', (req, res)=>{

})
