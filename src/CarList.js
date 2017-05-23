var React = require('react')
var {withRouter} = require('react-router-dom')
var {connect} = require('react-redux')

var NewSearch = require('./NewSearch')
var CarSearch = require('./CarSearch')

class CarList extends React.Component{

  goToCar(id){
    this.props.history.push(`/car/${id}`)
  }

  renderCarlist(){
    return this.props.carlist.map(car => {
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
                <button>Save</button>
                <a href="#" className="button"><div>Buy</div></a>
              </div>
            </div>
          </div>
        </li>
      )
    })
  }

  render(){
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

function mapStateToProps(state){
  return {
    carlist: state.carlist
  }
}

module.exports = withRouter(connect(mapStateToProps)(CarList))
