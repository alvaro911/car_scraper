var React = require('react')
var ReactRouter = require('react-router-dom')
var Router = ReactRouter.BrowserRouter
var Route = ReactRouter.Route
var Link = require('react-router-dom').Link

var Home = require('./Home')
var CarList = require('./CarList')

function App(props) {
  return (
    <Router>
      <div className="app">
        <main>
          <Route exact path="/" component={Home} />
          <Route path="/carlist" component={CarList} />
        </main>
      </div>
    </Router>
  );
}

module.exports = App
