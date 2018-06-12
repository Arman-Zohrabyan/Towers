import React from 'react';
import { render } from 'react-dom';


import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from "./reducers";

import './style.scss';
import Layout from './components/Layout.jsx';
import Join from './containers/Join/Join.jsx';
import BoardsPage from './components/BoardsPage/BoardsPage.jsx';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers(reducers),
  composeEnhancers(applyMiddleware(thunk))
);



render(
  <Provider store={ store }>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Redirect exact from='/' to='/join' />
          <Route exact path='/join' component={Join}/>
          <Route exact path='/boards' component={BoardsPage}/>
        </Switch>
      </Layout>
    </BrowserRouter>
  </Provider>
  , document.getElementById('game'));
