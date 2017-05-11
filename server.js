const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const async = require('async')

const {DATABASE_URL, PORT} = require('./config')
const {getLinks, carBuilderInfo} = require('./scraper')
const CarList = require('./models/carlists')
const carReq = require('./request')

const app = express()
const port = 3000
app.use(bodyParser.json())

const url = 'https://boulder.craigslist.org/search/cto?query='

function getCar(url, cb){
  carReq(url, html=>{
    cb('Error', carBuilderInfo(html))
  })
}

function carDb(url, cb){
  carReq(url, html => {
    let hrefs = getLinks(html)

    async.map(hrefs, getCar, (err, results) => {
      CarList.create(results, err => {
        console.log('your car list is being saved in the data base')
        if(err) console.log(err)
        cb(results)
      })
    })
  })
}

app.get('/cars', (req, res)=>{
  let searchParam = req.query.query
  let year = req.query.year
  carDb(`${url}${searchParam}`, carData => res.json(carData))
})

app.get('/cars/:id', (req, res)=>{
  let url = `https://boulder.craigslist.org/cto/`
  getCar(`${url}${req.params.id}.html`, (err, carData) => res.json(carData))
})

app.listen(port, ()=> console.log(`server listening to port ${port}`))
