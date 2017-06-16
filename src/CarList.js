import React from 'react'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import ReactPaginate from 'react-paginate'

import CarSearch from './CarSearch'

class CarList extends React.Component{

  goToCar(id){
    console.log(id)
    this.props.history.push(`/car/${id}`)
  }

  renderCarlist(){
    const { cars, loading } = this.props.carlist
    console.log('**************************');
    console.log(cars);
    if(loading){
      return <h1>Loading...</h1>
    } else {
      if (cars.length > 0) {
        return cars.map(car => {
          return (
            <li key={car._id}>
              <div className="car-wrapper">
                <div className="car-img">
                  <img src={car.img} />
                </div>
                <div className="car-info">
                  <h3>{car.title}</h3>
                  <h4>{car.city}</h4>
                  <h4>{car.price}</h4>
                  <div className="buttons">
                    <div className="car-link-button" onClick={this.goToCar.bind(this, car._id)}>Info</div>
                  </div>
                </div>
              </div>
            </li>
          )
        })
      } else {
        return (
          <h2 className="cant-find">No cars found</h2>
        )
      }
    }
  }

  render(){
    console.log('rendering carlist cars', this.props.carlist['cars'])
    return(
      <div className="app-body">
        <CarSearch />
        <ul>
          {this.renderCarlist()}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({carlist}){
  return {
    carlist
  }
}

export default withRouter(connect(mapStateToProps)(CarList))
