const chai = require('chai')
const chaiHttp = require('chai-http')
const faker = require('faker')
const mongoose = require('mongoose')

const should = chai.should()

const CarList = require('../models/carlists')
const {app, runServer, closeServer} = require('../server')
const {TEST_DATABASE_URL} = require('../config')

chai.use(chaiHttp)

function mockCarData(){
  console.log('generating mock data')
  const mockData=[]
  for(let i=1; i<=10; i++){
    mockData.push(generateCarData())
  }
  return CarList.insertMany(mockData)
}

function getCar(){
  const carModels = ['toyota', 'nissan', 'mitsubishi', 'honda', 'bmw']
  return carModels[Math.floor(Math.random() * carModels.length)]
}

function getId(){
  const ids = ['6176553016', '6166894499', '6168207742', '6150005952', '6156060016', '6168521897', '6146714030', '6143860753', '6167413623', '6165254050']
  for(let i=0; i<ids.length;i++){
    return ids[i]
  }
}

function generateCarData(){
  return {
    id: getId(),
    city: faker.address.city(),
    title: faker.lorem.sentence(),
    price: faker.commerce.price(),
    img: faker.image.imageUrl(),
    model: getCar(),
    link: faker.internet.url(),
    paragraph: faker.lorem.paragraph()
  }
}

function tearDownDb() {
    console.warn('Deleting database');
    return mongoose.connection.dropDatabase();
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

  describe('GET cars end point', function(){
    it('Should return the length of the database', function(){
      let res
      return chai.request(app)
        .get('/cars')
        .then(function(_res){
          res = _res
          res.should.have.status(200)
          res.should.be.json
          CarList.count()
            .then(function(count){
              res.body.carlist.should.have.length.of(count)
            })
        })
    })

    it('Should get a list of cars depending on the city', function(){
      return chai.request(app)
        .get('/cars')
        .query({city: 'denver'})
        .then(function(res){
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.should.be.json
          res.body.forEach(function(car){
            car.should.be.a('object')
            car.should.include.keys('_id', 'city', 'model', 'title', 'price', 'img', 'paragraph', 'link')
          })
        })
    })

    it('Should get a list of cars depending on car make', function(){
      return chai.request(app)
        .get('/cars')
        .query({model: 'toyota'})
        .then(function(res){
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.should.be.json
          res.body.forEach(function(car){
            car.should.be.a('object')
            car.should.include.keys('_id', 'city', 'model', 'title', 'price', 'img', 'paragraph', 'link')
          })
        })
    })

    it('Should get a list of cars depending on the city and car make', function(){
      return chai.request(app)
        .get('/cars')
        .query({model: 'toyota', city: 'denver'})
        .then(function(res){
          res.should.have.status(200)
          res.body.should.be.a('array')
          res.should.be.json
          res.body.forEach(function(car){
            car.should.be.a('object')
            car.should.include.keys('_id', 'city', 'model', 'title', 'price', 'img', 'paragraph', 'link')
          })
        })
    })
  })

  describe('Get cars/:id endpoint', function(){
    it('Should return a car depending on its Id', function(){
      let car, res
      return CarList.findOne()
        .exec()
        .then(function(_car){
          car = _car
          return chai.request(app)
            .get(`/car/${car.id}`)
            console.log('==================')
            console.log(car.id)
            .then(function(_res){
              res = _res
              res.should.have.status(200)
              res.body.carlists.should.be.a('object')
              res.body.carlists.id.should.equal(car.id)
              res.body.carlists.city.should.equal(car.city)
              res.body.carlists.model.should.equal(car.model)
              res.body.carlists.title.should.equal(car.title)
              res.body.carlists.price.should.equal(car.price)
              res.body.carlists.img.should.equal(car.img)
              res.body.carlists.paragraph.should.equal(car.paragraph)
              res.body.carlists.link.should.equal(car.link)
            })
      })
    })
  })
})
