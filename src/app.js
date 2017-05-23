import React from 'react';
import { render } from 'react-dom';
var { HashRouter, Route } = require('react-router-dom')
import { Provider } from 'react-redux';
import configureStore from './store';

var Home = require('./Home')
var CarList = require('./CarList')
var Car = require('./Car')


const store = configureStore();

render(
    <Provider store={store}>
      <HashRouter>
        <div className="app">
          <Route exact path='/' component={Home}/>
          <Route path='/carlist' component={CarList}/>
        </div>
      </HashRouter>
    </Provider>,
    document.getElementById('app')
);
