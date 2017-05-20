var React = require('react')
var getCars = require('./actions')
var {connect} = require('react-redux')

class CarSearch extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      carlist: []
    }
  }
  startSearch(e){
    e.preventDefault()
    // console.log('this', this.refs.model.value)
    let model = this.refs.model.value
    let city = this.refs.city.value
    this.props.dispatch(getCars(model))
  }

  render(){
    return(
      <div className="car-search">
        <h3>Search for your car</h3>
        <form onSubmit={this.startSearch.bind(this)}>
          <label>State</label><br/>
          <input type="text" ref="state" placeholder="state"/>
          <label>City</label><br/>
          <input type="text" ref="city" placeholder="city"/>
          <label>Model</label><br/>
          <input type="text" ref="model" placeholder="model"/>
          <button type="submit">Search</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state){return {}}
module.exports = connect(mapStateToProps)(CarSearch)
