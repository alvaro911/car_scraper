var axios = require('axios')

function getCars(query, city){
  return dispatch => {
    dispatch({
      type: 'LOAD_CARS'
    })
    axios.get('/cars', {
      params: {
        query: query,
        city: city
      }
    })
    .then(response => {
      return dispatch({
        type:'LOAD_CARS_SUCCESS',
        cars: response.data
      })
    })
  }
}

const getCarById = (id, city) => dispatch => {
  axios.get(`/car/${id}?`,{
    params:{
      city: city
    }
  })
    .then(response => {
      dispatch({
        type: 'FOUNDCAR',
        payload: response.data
      })
    })
}

module.exports = {getCars, getCarById}
