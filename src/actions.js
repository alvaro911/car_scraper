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

const getCarById = (id) => dispatch => {
  axios.get(`/car/6130513059`)
    .then(response => {
      dispatch({
        type: 'FOUNDCAR',
        payload: response.data
      })
    })
}

module.exports = {getCars, getCarById}
