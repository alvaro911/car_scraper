const chai = require('chai')
const chaiHttp = require('chai-http')
const faker = require('faker')
const mongoose = require('mongoose')

const should = chai.shoudl()

const {Carlist} = require('../models/carlists')
const {app, runServer, closeServer} = require('../server')
const {TEST_DATABASE_URL} = require('../config')

chai.use(http)

function mockCarData(){
  console.log('generating mock data')
  const mockData=[]
  for(let i=1; i<=10; i++){
    mockData.push(generateCarData())
  }
}

function generateCarData(){
  return{
    carId:faker.random.uuid(),
    city:faker.address.city(),
    title:faker.lorem.sentence(),
    price:faker.commerce.price(),
    img:faker.image.imageUrl()
  }
}

function tearDownDb(){
  console.log('tear down database')
  return mongoose.disconnect.dropDatabase()
}

describe('Used cars API resource', function(){

  before(function(){
    return runServer(TEST_DATABASE_URL)
  })

  beforeEach(function(){
    return mockCarData()
  })

  afterEach(function(){
    return tearDownDb()
  })

  after(function(){
    return closeServer()
  })

  describe('GET carlist endpoint', function(){
    it('should return a list of cars using models submitted by the user and the city they are looking for', function(){
      // should get a status of 2 handred and list should be as long as cars in the db
      //
      let res
      return chai.request(app)
        .get('/carlist')
          .then(function(_res){
            res = _res
            res.should.have.status(200)
            res.body.carlist.should.have.length.of.at.least(1)
            return Carlist.count()
          })
          .then(function(count){
            res.body.carlist.should.have.length.of(count)
          })
    })

    it('should return carlist with the right fields', function(){
      let resCarlist
      return chai.request(app)
        .get('/carlist')
          .then(function(res){
            res.should.be.json
            res.body.carlist.should.be.a('array')
            res.body.carlist.should.have.length.of.at.least(1)

            res.body.carlist.forEach(function(car){
              car.should.be.a('object')
              car.should.include.keys('id', 'carId', 'city', 'title', 'price', 'img')
            })
            resCarlist = res.body.carlist[0]
            return Carlist.findById(resCarlist.id)
          })
          .then(function(car){
            resCarlist.id.should.equal(car.id)
            resCarlist.carId.should.equal(car.carId)
            resCarlist.city.should.equal(car.city)
            resCarlist.title.should.equal(car.title)
            resCarlist.price.should.equal(car.price)
            resCarlist.img.should.equal(car.img)
          })

    })

    describe('GET car by id endpoing' function(){
      it('should get a car using it\'s unique carid', function(){
        return chai.request(app)
          let res, resCar
          .get('/car/:id')
          .then(function(_res){
            res = _res
            res.should.have.status(200)
            res.should.be.json
            resCar = res.body.carlist[0]
            return Carlist.findById(resCarlist.id)
          })
          .then(function(car){
            resCar.id.should.equal(car.id)
            resCar.carId.should.equal(car.carId)
            resCar.city.should.equal(car.city)
            resCar.title.should.equal(car.title)
            resCar.price.should.equal(car.price)
            resCar.img.should.equal(car.img)
          })
      })
    })
  })
})
