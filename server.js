const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const async = require('async')
const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy;

mongoose.Promise = global.Promise

const {DATABASE_URL, PORT} = require('./config')
const {getLinks, carBuilderInfo} = require('./scraper')
const CarList = require('./models/carlists')
const User = require('./models/user')
const carReq = require('./request')

const app = express()

app.use(bodyParser.json())
passport.use(new BasicStrategy(
  function(username, password, callback) {
    console.log('username', username)
    console.log('password', password)
    console.log('here');
    callback(null, {
      username: 'jason'
    })
  }
));

app.use(passport.initialize())
app.use(express.static('public'))

app.get(
  '/login',
  passport.authenticate('basic'),
  (req, res) => {
    res.json({
      is: "here"
  })
})

function getUser(username, cb){
  User.findOne({username}, (err, user)=>{
    cb(err, user)
  })
}

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
  carDb(`https://${searchCity}.craigslist.org/search/cto?query=${searchParam}`, searchCity, carData => res.status(200).json(carData))
})

app.get('/car/:id', (req, res)=>{
  console.log('id:', req.params.id)
  const city = req.query.city
  let url = `https://${city}.craigslist.org/cto/`
  getCar(`${url}${req.params.id}.html`, (err, carData) => {
    console.log(carData);
    res.json(carData);
  })
  // const carData =  {
  //   "carId": "6130513059",
  //   "city": " (denver)",
  //   "title": "2004 mazda 3 i sport 4D sedan",
  //   "price": "$2800",
  //   "img": "https://images.craigslist.org/00404_dxNBi5T9Gq8_600x450.jpg"
  // }

  res.status(200).json(carData)

})

app.post("/login"
    ,passport.authenticate('local',{
        successRedirect : "/",
        failureRedirect : "/login",
    })
);

let server

function runServer(databaseUrl=DATABASE_URL, port=PORT){
  return new Promise((res, rej)=>{
    mongoose.connect(databaseUrl, err=>{
      if(err){
        return rej(err)
      }
      server = app.listen(port, ()=>{
        console.log(`server listening to port ${port}`)
        res()
      })
      .on('error', err=>{
        mongoose.disconnect()
        rej(err)
      })
    })
  })
}

function closeServer(){
  return mongoose.disconnect().then(()=>{
    return new Promise((res, rej)=>{
      console.log('closing server')
      server.close(err=>{
        if(err){
          return rej(err)
        }
        res()
      })
    })
  })
}

if(require.main === module){
  runServer().catch(err => console.error(err))
}

module.exports = {app, runServer, closeServer}
