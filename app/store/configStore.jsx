import * as redux from 'redux';
import thunk from 'redux-thunk';

import {orderReducer, searchTextReducer, showCompletedReducer, authReducer, unAuthReducer} from 'reducers';

export var configure = (initialState = {}) => {
  var reducer = redux.combineReducers({
    orders: orderReducer,
    searchText: searchTextReducer,
    showCompleted: showCompletedReducer,
    user: authReducer,
    unAuthProps:unAuthReducer
  });

  var store = redux.createStore(reducer, initialState, redux.compose(
    redux.applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  ));

  return store;
};
