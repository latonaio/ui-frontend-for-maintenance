import React from 'react';
import {Redirect, Route} from 'react-router-dom';

export const PrivateRoute = ({component: Component, makerID, ...rest}) => (
  <Route {...rest} render={props => (
    localStorage.getItem('token')
      ? <Component {...props} makerID={makerID}/>
      : <Redirect to={{pathname: '/', state: {from: props.location}}}/>
  )}/>
)
