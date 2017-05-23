var axios = require('axios')

function getCars(query, city){
  return dispatch => {
    axios.get('/cars', {
      params: {
        query: query,
        city: city
      }
    })
    .then(response => {
      console.log(response.data)
      return dispatch({
        type:'LOAD_CARS',
        cars: response.data
      })
    })
  }
}

module.exports = getCars
