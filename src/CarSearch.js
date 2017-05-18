var React = require('react')
const axios = require('axios');

class CarSearch extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      carlist: []
    }
  }
  getCars(e){
    e.preventDefault()
    // console.log('this', this.refs.model.value)
    let model = this.refs.model.value
    let city = this.refs.city.value
    axios.get('/cars', {
      params: {
        model: model
      }
    })
    .then(response => {
      // console.log('Query Response: ', response.data);
      this.setState({carlist: response.data})
    })
  }

  render(){
    console.log(this.state.carList)
    return(
      <div className="car-search">
        <h3>Search for your car</h3>
        <form onSubmit={this.getCars.bind(this)}>
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

module.exports = CarSearch
