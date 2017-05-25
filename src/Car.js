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
        <div>
          {this.props.foundCar['title']}
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
