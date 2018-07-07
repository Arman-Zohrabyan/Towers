/**
 * Created By: Arman Zohrabyan
 */

import React from "react";
import { Route, Redirect } from "react-router-dom";
import User from "./User";

/**
 * Only joined users can join to this routes 
 */
const AuthRoute = ({ component: Component, ...rest }) => (  
  <Route {...rest} render={props => (
    User.isJoined ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/join',
        state: { from: props.location }
      }}/>
    )
  )}/>
);

/**
 * Only unjoined users can join to this routes 
 */
const UnAuthRoute = ({ component: Component, ...rest }) => (  
  <Route {...rest} render={props => (
    !User.isJoined ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/boards',
        state: { from: props.location }
      }}/>
    )
  )}/>
);



export {
  AuthRoute,
  UnAuthRoute
};
