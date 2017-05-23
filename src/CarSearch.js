var React = require('react')
var {withRouter} = require('react-router-dom')
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
    let query = this.refs.model.value
    let city = this.refs.city.value
    this.props.dispatch(getCars(query, city))
    if(this.props.location.pathname !== 'carlist'){
      this.props.history.push('/carlist')
    }
  }

  render(){
    return(
      <div className="car-search">
        <h3>Search for your car</h3>
        <form onSubmit={this.startSearch.bind(this)}>
          <label>State</label><br/>
          <input type="text" placeholder="state"/>
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
module.exports = withRouter(connect(mapStateToProps)(CarSearch))
