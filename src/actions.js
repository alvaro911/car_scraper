import axios from 'axios'

export const getCars = (query, city) => {
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
    }).catch(err => {
      console.log(err);
    })
  }
}

export const getCarById = (id) => {
  return dispatch => {
    dispatch({
      type: 'FOUNDCAR'
    })
    axios.get(`/car/${id}`,{
      params:{
        _id: id
      }
    })
    .then(response => {
      dispatch({
        type: 'FOUNDCAR_SUCCESS',
        payload: response.data
      })
    }).catch(err => {
      dispatch({
        type: 'FOUNDCAR_ERROR'
      })
      console.log(err);
    })
  }
}
