import React from 'react'
import {connect} from 'react-redux'
import { getCarById } from './actions'

class Car extends React.Component{
  componentDidMount() {
    this.props.getCarById(this.props.match.params.id)
  }
  render(){
    if(this.props.data.loading && !this.props.data.foundCar){
      return(
        <div>
          Loading!!!
        </div>
      )
    }
    return (
      <div className="car">
        <div className="banner-info">
          <div className="values">
            <h2>{this.props.data.foundCar.title}</h2>
          </div>
          <div className="values">
            <h5>Price</h5>
            <h2>{this.props.data.foundCar.price}</h2>
          </div>
        </div>
        <div className="car-display">
          <div className="car-picture">
            <img src={this.props.data.foundCar.img} />
          </div>
          <div className="car-elements">
            <article>
              {this.props.data.foundCar.paragraph}
            </article>
            <a href={this.props.data.foundCar.link} target="_blank"><div className="car-link-button">
              Go
            </div></a>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    data: state.carlist
  }
}

export default connect(mapStateToProps, {
  getCarById,
})(Car)
