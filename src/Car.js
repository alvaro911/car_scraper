var React = require('react')

class Car extends React.Component{
  render(){
    this.props.car
    return(
      <div>

      </div>
    )
  }
}

function mapStateToProps(state){
  return {
    car: selectCarById(state, this.propos.location.pathname)
  }
}
module.exports = connect(mapStateToProps)(Car)
