import React from 'react';
import { render } from 'react-dom';
var { HashRouter, Route } = require('react-router-dom')
import { Provider } from 'react-redux';
import configureStore from './store';

const Header = require('./Header')
const Home = require('./Home')
const CarList = require('./CarList')
const Car = require('./Car')


const store = configureStore();

render(
    <Provider store={store}>
      <HashRouter>
        <div className="app">
          <Header />
          <Route exact path='/' component={Home}/>
          <Route path='/carlist' component={CarList}/>
          <Route path='/car/:id' component={Car}/>
        </div>
      </HashRouter>
    </Provider>,
    document.getElementById('app')
);
