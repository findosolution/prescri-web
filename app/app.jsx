import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {hashHistory} from 'react-router';

import * as actions from 'actions';
//import firebase from 'app/firebase';
import router from 'app/router';

var store = require('configStore').configure();

/*
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(actions.login(user.uid));
    store.dispatch(actions.startAddTodos());
    hashHistory.push('/todos');
  } else {
    store.dispatch(actions.logout());
    hashHistory.push('/');
  }
}); */
//todo - dummy code
var user = true;
if(user) {
  store.dispatch(actions.startLoadOrders());
  hashHistory.push('/orders');
} else {
  hashHistory.push('/');
}

$(document).foundation();

require('style!css!sass!applicationStyles');

ReactDOM.render(
  <Provider store={store}>
    {router}
  </Provider>,
  document.getElementById('app')
);
