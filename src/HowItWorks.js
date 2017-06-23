import React from 'react'

import carSvg from './img/car.png'
import markerSvg from './img/marker.png'

class HowItWorks extends React.Component{
  render(){
    return(
      <div className="how-it-works">
        <div className="diagonal"></div>
        <div className="explainer">
          <h3 className="hind">How it Works</h3>
          <p>
            CarStock is the app you need when you are looking for a used car in Colorado, There are 3 different ways you can submit your search.
          </p>
          <div className="explainer-info">
            <div className="explainer-pieces">
              <div className="explainer-images">
                <img src={carSvg} />
              </div>
              <p>
                Look for all the cars available in your city. (i.e. Denver)
              </p>
            </div>
            <div className="explainer-pieces">
              <div className="explainer-images">
                <img src={markerSvg} />
              </div>
              <p>
                Look for a car make and you'll see where you can find them in the state (i.e. Nissan)
              </p>
            </div>
            <div className="explainer-pieces">
              <div className="explainer-images">
                <img src={carSvg} />
                <img src={markerSvg} />
              </div>
              <p>
                To narrow your search you can submit a city and car make (i.e. Boulder and Toyota)
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default HowItWorks
