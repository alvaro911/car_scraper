var axios = require('axios')

function getCars(model){
  return dispatch => {
    axios.get('/cars', {
      params: {
        model: model
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
