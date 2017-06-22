import React from 'react'
import {withRouter} from 'react-router-dom'
import {getCars} from './actions'
import {connect} from 'react-redux'

class CarSearch extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      carlist: []
    }
  }

  startSearch(e){
    e.preventDefault()
    const query = this.refs.model.value
    const city = this.refs.city.value.toLowerCase()
    this.props.getCars(query, city)
    if(this.props.location.pathname !== 'carlist'){
      this.props.history.push('/carlist')
    }
  }

  render(){
    return(
      <div className="car-search">
        <h3>Search for your car</h3>
        <form onSubmit={this.startSearch.bind(this)}>
          <label>City</label><br/>
          <input type="text" ref="city" placeholder="city"/>
          <label>Make</label><br/>
          <input type="text" ref="model" placeholder="model"/>
          <button type="submit">Search</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state){return {}}

export default withRouter(connect(mapStateToProps, { getCars })(CarSearch))
