import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import {firebase} from 'myFirebase';

import PrescripApp from 'PrescripApp';
import OrderCreate from 'OrderCreate';
import ResetPassword from 'ResetPassword';
import Login from 'Login';

var requireLogin = (nextState, replace, next) => {
  if(!firebase.auth().currentUser) {
    replace('/');
  }

  next();
};

var redirectIfLogedIn = (nextState, replace, next) => {
  if(firebase.auth().currentUser) {
    replace('/orders');
  }

  next();
};

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="/orders" component={PrescripApp} onEnter={requireLogin}/>
      <Route path="/new" component={OrderCreate} onEnter={requireLogin}/>
      <Route path="/reset-password" component={ResetPassword}/>
      <IndexRoute component={Login} onEnter={redirectIfLogedIn}/>
    </Route>
  </Router>
);
