const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const morgan = require('morgan')
const BasicStrategy = require('passport-http').BasicStrategy

mongoose.Promise = global.Promise

const {DATABASE_URL, PORT} = require('./config')
const CarList = require('./models/carlists')
const User = require('./models/user')

const app = express()

app.use(bodyParser.json())
passport.use(new BasicStrategy(
  function(username, password, callback) {
    console.log('username', username)
    console.log('password', password)
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

app.get('/cars', (req, res)=>{
  const searchParam = req.query.query
  const searchCity = req.query.city
  if(!searchCity){
    CarList.find({
      model:searchParam
    }).then(cars => {
      return res.status(200).json(cars)
    }).catch(err => {
      return res.status(400).json(err)
    })
  }else if(!searchParam){
    CarList.find({
      city: searchCity
    })
    .then(cars => {
      return res.status(200).json(cars)
    })
    .catch(err => {
      return res.status(400).json(err)
    })
  }else{
    CarList.find({
      model:searchParam,
      city:searchCity
    }).then(cars => {
      return res.status(200).json(cars)
    }).catch(err => {
      return res.status(400).json(err)
    })
  }
})

app.get('/car/:id', (req, res)=>{
  CarList.findOne({
    _id:req.params.id
  }).then(car => {
    return res.status(200).json(car)
  }).catch(err => {
    return res.status(404).json(err)
  })

})

app.post("/login"
    ,passport.authenticate('local',{
        successRedirect : "/",
        failureRedirect : "/login",
    })
);

app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
  })

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
//
// app.listen(PORT, ()=> console.log(`Server listening to port: ${PORT}`))
//


module.exports = {app, runServer, closeServer}
