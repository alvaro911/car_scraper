import {combineReducers} from 'redux'

const initialState = {
  cars:[],
  loading: false,
  foundCar: {},
  error: false
}
const carlist = (state=initialState, action) => {
  switch (action.type){
    case 'LOAD_CARS':
      return {
        ...state,
        loading: true
      }
    case 'LOAD_CARS_SUCCESS':
      return {
        ...state,
        cars: action.cars,
        loading: false
      }
    case 'FOUNDCAR':
      return {
        ...state,
        loading: true
      }
    case 'FOUNDCAR_SUCCESS':
      return {
        ...state,
        loading: false,
        foundCar: action.payload
      }
    case 'FOUNDCAR_ERROR':
      return {
        ...state,
        loading: false,
        error: true
      }
    default:
      return state
  }
}

export default combineReducers({carlist})
