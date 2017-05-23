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

app.use(express.static('public'))
const url = 'https://boulder.craigslist.org/search/cto?query='

function getCar(url, cb){
  carReq(url, (html)=>{
    cb(null, carBuilderInfo(html))
  })
}

function carDb(url, city, cb){
  carReq(url, (html) => {
    let hrefs = getLinks(html, city)

    async.mapLimit(hrefs, 10, getCar, (err, results) => {
      CarList.create(results, err => {
        console.log('your car list is being saved in the data base')
        if(err) console.log(err)
        cb(results)
      })
    })
  })
}

app.get('/cars', (req, res)=>{
  const searchParam = req.query.query
  const searchCity = req.query.city
  carDb(`https://${searchCity}.craigslist.org/search/cto?query=${searchParam}`, searchCity, carData => res.json(carData))
})

app.get('/car/:id', (req, res)=>{
  console.log('id:', req.params.id);
  let url = `https://boulder.craigslist.org/cto/`
  getCar(`${url}${req.params.id}.html`, (err, carData) => {
    console.log(carData);
    res.json(carData);
  })

})

app.listen(port, ()=> console.log(`server listening to port ${port}`))
