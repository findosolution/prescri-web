import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import {firebase} from 'myFirebase';

import PrescripApp from 'PrescripApp';
import OrderCreate from 'OrderCreate';
import ResetPassword from 'ResetPassword';
import ConfirmCode from 'ConfirmCode';
import Login from 'Login';
import SignUp from 'SignUp';

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
      <Route path="/confirm-code" component={ConfirmCode}/>
      <Route path="/signup" component={SignUp}/>
      <IndexRoute component={Login} onEnter={redirectIfLogedIn}/>
    </Route>
  </Router>
);
