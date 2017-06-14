import React from 'react'

import Hero from './Hero'
import HowItWorks from './HowItWorks'
import CarSearch from './CarSearch'

class Home extends React.Component{
  render(){
    return (
      <div className="app-body">
        <Hero/>
        <HowItWorks/>
        <CarSearch/>
      </div>
    )
  }
}

export default Home
