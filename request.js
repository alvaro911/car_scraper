const request = require('request')

function carReq(url, cb){
  request(url, (err, res, html) => {
    cb(html)
  })
}

module.exports = carReq
