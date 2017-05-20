var axios = require('axios')

function getCars(model){
  return dispatch => {
    return axios.get('/cars', {
      params: {
        model: model
      }
    })
    .then(response => {
      return dispatch({
        type:'LOAD_CARS',
        cars:response.data
      })
    })
  }
}

module.exports = getCars
