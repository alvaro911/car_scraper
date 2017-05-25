const mongoose = require('mongoose')

const URL = 'mongodb://localhost:27017/car_finder_app'

const Schema = mongoose.Schema

mongoose.connect(URL)
mongoose.connection.on('error', () => {
  console.log('MongoDB connection error. Make sure MongoDB is running')
})

const usersSchema = new Schema({
  userName: {type:String, required:true},
  email: {type:String, required: true},
  password: {type:String, required: true},
})

module.exports = mongoose.model('User', usersSchema)
