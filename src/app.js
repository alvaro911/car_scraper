import React from 'react';
import { render } from 'react-dom';
import { HashRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux';
import configureStore from './store';

import Header from'./Header'
import Home from'./Home'
import CarList from'./CarList'
import Car from './Car'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'


const store = configureStore();

render(
    <Provider store={store}>
      <HashRouter>
        <ScrollToTop>
          <div className="app">
            <Header />
            <Route exact path='/' component={Home}/>
            <Route path='/carlist' component={CarList}/>
            <Route path='/car/:id' component={Car}/>
            <Footer />
          </div>
        </ScrollToTop>
      </HashRouter>
    </Provider>,
    document.getElementById('app')
);
