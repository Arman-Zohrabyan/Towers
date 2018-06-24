/**
 * Created By: Arman Zohrabyan
 *
 * App Initial file.
 */

import React from 'react';
import { render } from 'react-dom';


import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from './store/reducers';

import './style.scss';
import Layout from './components/Layout.jsx';
import Join from './containers/Join/Join.jsx';
import BoardsPage from './containers/Boards/Boards.jsx';
import GamePage from './components/GamePage/GamePage.jsx';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers(reducers),
  composeEnhancers(applyMiddleware(thunk))
);


render(
  <Provider store={store}>
    <BrowserRouter>
      <Layout>
        <Switch>
          <Redirect exact from='/' to='/join' />
          <Route exact path='/join' component={Join}/>
          <Route exact path='/boards' component={BoardsPage}/>
          <Route exact path='/room/:socketId' component={GamePage}/>
        </Switch>
      </Layout>
    </BrowserRouter>
  </Provider>
  , document.getElementById('game'));
