var React = require('react')
var {connect} = require('react-redux')
const { getCarById } = require('./actions')

class Car extends React.Component{
  componentDidMount() {
    this.props.getCarById(12344)
  }
  render(){
    if (this.props.foundCar){
      return (
        <div className="car">
          <div className="banner-info">
            <div className="values">
              <h5>Price</h5>
              <h2>{this.props.foundCar['price']}</h2>
            </div>
            <div className="values">
              <h5>Mileage</h5>
              <h2>123000 Mi</h2>
            </div>
          </div>
          <div className="car-picture">
            <img src={this.props.foundCar['img']} />
          </div>
          <div className="car-elements">
            <h2>{this.props.foundCar['title']}</h2>
            <a href="#"><div className="car-link-button">
              Go
            </div></a>
          </div>
        </div>
      )
    }
    return(
      <div>
        Loading!!!
      </div>
    )
  }
}

function mapStateToProps({carlist}){
  const { foundCar } = carlist;
  return { foundCar }
}

module.exports = connect(mapStateToProps, {
  getCarById,
})(Car)
