var React = require('react')
var {withRouter} = require('react-router-dom')
var {connect} = require('react-redux')

var NewSearch = require('./NewSearch')
var CarSearch = require('./CarSearch')
var mockData = require('./mock-data')

class CarList extends React.Component{

  goToCar(id, city){
    this.props.history.push(`/car/${id}`)
  }

  renderCarlist(){
    const { cars, loading } = this.props.carlist
    if(loading){
      return <h1>Loading...</h1>
    }
    return cars.map(car => {
      return (
        <li key={car.carId} onClick={this.goToCar.bind(this, car.carId)}>
          <div className="car-wrapper">
            <div className="car-img">
              <img src={car.img} />
            </div>
            <div className="car-info">
              <h3>{car.title}</h3>
              <h4>{car.city}</h4>
              <h4>{car.price}</h4>
              <div className="buttons">
                <a href="#"><div className="car-link-button">Buy</div></a>
              </div>
            </div>
          </div>
        </li>
      )
    })
  }

  // renderMock(){
  //   return mockData.map((car) => {
  //     return(
  //       <li key={car.carId} onClick={this.goToCar.bind(this, car.carId)}>
  //         <div className="car-wrapper">
  //           <div className="car-img">
  //             <img src={car.img} />
  //           </div>
  //           <div className="car-info">
  //             <h3>{car.title}</h3>
  //             <h4>{car.city}</h4>
  //             <h4>{car.price}</h4>
  //             <a href="#"><div className="car-link-button">Buy</div></a>
  //           </div>
  //         </div>
  //       </li>
  //     )
  //   })
  // }

  render(){
    console.log('rendering carlist cars', this.props.carlist['cars'])
    return(
      <div className="app-body">
        <NewSearch />
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

module.exports = connect(mapStateToProps)(CarList)
