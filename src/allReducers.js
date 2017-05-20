var {combineReducers} = require('redux')

const carlist = (state=[], action) => {
  switch (action.type){
    case 'LOAD_CARS':
      return action.cars
    default:
      return state
  }
}
module.exports = combineReducers({carlist})
