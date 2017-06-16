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
  return mockData
}

function getCar(){
  const carModels = ['toyota', 'nissan', 'mitsubishi', 'honda', 'bmw']
  return carModels[Math.floor(Math.random() * carModels.length)]
}

function generateCarData(){
  return {
    _id: faker.random.uuid(),
    city: faker.address.city(),
    title: faker.lorem.sentence(),
    price: faker.commerce.price(),
    img: faker.image.imageUrl(),
    model: getCar(),
    link: faker.internet.url(),
    paragraph: faker.lorem.paragraph()
  }
}

function disconnectDb(){
  console.log('Disconnect from database')
  return mongoose.disconnect()
}

describe('Used cars API resource', function(){
  let mockResults;

  before(function(){
    return runServer(TEST_DATABASE_URL)
  })

  beforeEach(function(){
    return mockResults = mockCarData()
  })

  afterEach(function(){
    return disconnectDb()
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

    it.only('Should get a list of cars depending on the city', function(){
      return chai.request(app)
        .get('/cars')
        .query({city: 'denver'})
        .then(function(res){
          res.should.have.status(200)
          res.body.should.be.a('array')
        })
    })
  })
})
