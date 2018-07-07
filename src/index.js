/**
 * Created By: Arman Zohrabyan
 *
 * App Initial file.
 */

import React from 'react';
import { render } from 'react-dom';


import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { AuthRoute, UnAuthRoute } from './modules/RouteTypes.jsx';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import * as reducers from './store/reducers';

import './style.scss';
import Layout from './components/Layout.jsx';
import Join from './containers/Join.jsx';
import BoardsPage from './containers/Boards.jsx';
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
          <UnAuthRoute exact path='/join' component={Join}/>
          <AuthRoute exact path='/boards' component={BoardsPage}/>
          <AuthRoute exact path='/room/:socketId' component={GamePage}/>
        </Switch>
      </Layout>
    </BrowserRouter>
  </Provider>
  , document.getElementById('game'));
