var React = require('react')
var { HashRouter, Route } = require('react-router-dom')
var {Provider} = require('react-redux')
var {createStore, applyMiddleware} = require('redux')
var thunk = require('redux-thunk')

var Home = require('./Home')
var CarList = require('./CarList')
var reducers = require ('./allReducers')
var store = createStore(reducers, applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="app">
            <Route exact path='/' component={Home}/>
            <Route path='/carlist' component={CarList}/>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

module.exports = App
