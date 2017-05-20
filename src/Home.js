var React = require('react')

var Header = require('./Header')
var Hero = require('./Hero')
var HowItWorks = require('./HowItWorks')
var CarSearch = require('./CarSearch')

class Home extends React.Component{
  render(){
    return (
      <div className="app-body">
        <Header/>
        <Hero/>
        <HowItWorks/>
        <CarSearch history={this.props.history}/>
      </div>
    )
  }
}

module.exports = Home
