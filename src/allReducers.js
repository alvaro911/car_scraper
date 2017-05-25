var {combineReducers} = require('redux')

const carlist = (state={}, action) => {
  console.log(state)
  switch (action.type){
    case 'LOAD_CARS':
      return action.cars
    case 'FOUNDCAR':
      // console.log(action.payload)
      return {foundCar: action.payload}
    default:
      return state
  }
}

// const selectCarById = (state, id) => {
//   return state.find(car => car.id === id)
// }
module.exports = combineReducers({carlist})
