import React from 'react';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';

//import firebase from 'app/firebase';

import PrescripApp from 'PrescripApp';
import OrderCreate from 'OrderCreate';
import Login from 'Login';
/*
var requireLogin = (nextState, replace, next) => {
  if (!firebase.auth().currentUser) {
    replace('/')
  }

  next();
};

var redirectIfLogedIn = (nextState, replace, next) => {
  if (firebase.auth().currentUser) {
    replace('/orders');
  }

  next();
};*/

export default (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="/orders" component={PrescripApp}/>
      <Route path="/new" component={OrderCreate}/>
      <IndexRoute component={Login}/>
    </Route>
  </Router>
);
