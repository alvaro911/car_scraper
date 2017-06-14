import React from 'react'

import bmw from './img/bmw.png'
import chevy from './img/chevy.png'
import toyota from './img/toyota.png'

class Hero extends React.Component{
  render(){
    const carsPicArr = [bmw, chevy, toyota]
    const carPic = carsPicArr[Math.floor(Math.random()*carsPicArr.length)]
    return (
      <div className="hero-img">
        <img src={carPic}/>
      </div>
    )
  }
}

export default Hero
