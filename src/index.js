// fetch('http://localhost:3000/cars?query=subaru').then(res => res.json()).then(res => console.log(res))

var React = require('react')
var reactDom = require('react-dom')
var App = require('./App')

reactDom.render(<App></App>, document.getElementById('app'))
