import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

import {firebase} from 'myFirebase';

import PrescripApp from 'PrescripApp';
import OrderCreate from 'OrderCreate';
import Login from 'Login';

var requireLogin = (nextState, replace, next) => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      replace('/orders');
    } else {
      replace('/');
    }
  });

  next();
};

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="/orders" component={PrescripApp} onEnter={requireLogin}/>
      <Route path="/new" component={OrderCreate} onEnter={requireLogin}/>
      <IndexRoute component={Login} onEnter={requireLogin}/>
    </Route>
  </Router>
);
