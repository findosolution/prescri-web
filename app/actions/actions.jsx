import {firebase, googleProvider} from 'myFirebase';

export var loadOrders = (orders) => {
  return {
    type: 'LOAD_ORDERS',
    orders
  };
};

export var startLoadOrders = () => {
  return (dispatch, getState) => {
    var orders = [
      {
        id: 'PRE0001',
        orderby: 'supun',
        location: 'malabe',
        pharmacy: 'lanka pharmacy - Malabe',
        status: 1,
        prescription: 'sdadadsadadd',
        createdAt: 2323232,
        completedAt: null
      },{
        id: 'PRE0002',
        orderby: 'supun',
        location: 'malabe',
        pharmacy: 'healthgard - Nawala',
        status: 1,
        prescription: 'sdadadsadadd',
        createdAt: 2323232,
        completedAt: null
      },{
        id: 'PRE0003',
        orderby: 'supun',
        location: 'malabe',
        pharmacy: 'healthgard - Nugegoda',
        status: 5,
        prescription: 'sdadadsadadd',
        createdAt: 2323232,
        completedAt: null
      }
    ];

    dispatch(loadOrders(orders));
  };
};

export var addOrder = (order) => {
  return {
    type: 'ADD_ORDER',
    order
  };
};

export var startAddOrder = (order) => {
  return (dispatch, getState) => {
    dispatch(addOrder(order));
  };
};

export var setSearchText = (text) => {
  return {
    type: 'SET_SEARCH_TEXT',
    text
  };
};

export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  };
};

export var login = (uid) => {
  return {
    type: 'LOGIN',
    uid
  };
};

export var startLogin = () => {
  return (dispatch, getState) => {
    return firebase.auth().signInWithPopup(googleProvider).then((result) => {
      //dispatch(login(result.user.uid));
      console.log('Auth worked', result);
    }, (error) => {
      console.log('Auth failed', error);
    });
  };
};

export var logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export var startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then(() => {
      dispatch(logout());
      console.log('Logout success');
    });
  };
};
