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

function getCity(){
  const coCities = ['pueblo', 'greeley', 'sterling', 'northern colorado', 'colorado springs', 'aspen', 'west vail', 'jefferson', 'silverthorne']
  return coCities[Math.floor(Math.random() * coCities.length)]
}

function getCar(){
  const carModels = ['mitsubishi', 'toyota', 'jeep', 'hyundai', 'Volkswagen', 'Chevrolet']
  return carModels[Math.floor(Math.random() * carModels.length)]
}

function getId(){
  const ids = ['6129109136', '6153147300', '6141862088', '6176475959', '6147462550', '6173812108', '6141435502', '6144468918', '6172176671']
  return ids[Math.floor(Math.random() * ids.length)]
}

function generateCarData(){
  return {
    _id: getId(),
    city: getCity(),
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
        })
    })

    it('Should return a single car with the correct fields', function() {
      // const car = new Car({
      //   id: '6129109136',
      //   city: "colorado springs",
      //   model:"VW"
      // })
      console.log("+++++++++++++++++++++++++++++++")
      return chai.request(app)
        .get('/car/6129109136')
        .then(function(res){
          console.log(res.body)
        })
    })
  })
})
