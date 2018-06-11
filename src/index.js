import React from 'react';
import { render } from 'react-dom';


import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import './style.scss';

import Layout from './components/Layout.jsx';

import JoinPage from './components/JoinPage/JoinPage.jsx';
import BoardsPage from './components/BoardsPage/BoardsPage.jsx';


render(
  <BrowserRouter>
    <Layout>
      <Switch>
        <Redirect exact from='/' to='/join' />
        <Route exact path='/join' component={JoinPage}/>
        <Route exact path='/boards' component={BoardsPage}/>
      </Switch>
    </Layout>
  </BrowserRouter>
  , document.getElementById('game'));
