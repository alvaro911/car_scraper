var {combineReducers} = require('redux')

const initialState = {
  cars:[],
  loading: false
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
        cars: action.cars,
        loading: false
      }
    case 'FOUNDCAR':
      return Object.assign(state, {foundCar: action.payload})
    default:
      return state
  }
}

module.exports = combineReducers({carlist})
