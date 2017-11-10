export var orderReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_ORDERS':
      return[
        ...state,
        ...action.orders
      ];
    case 'ADD_ORDER':
      console.log('orders', action.order);
      return[
        ...state,
        {
          ...action.order
        }
      ];
    default:
      return state;
  };
};

export var searchTextReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_TEXT':
      return action.text;
    default:
      return state;
  };
};

export var showCompletedReducer = (state = false, action) => {
  switch (action.type) {
    case 'TOGGLE_SHOW_COMPLETED':
      return !state;
    default:
      return state;
  };
};

export var authReducer = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        uid: action.uid
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  };
};

export var unAuthReducer = (state ={} , action) => {
  switch (action.type) {
    case 'RESETPASSWORD':
      return action.resetProps;

    case 'CONFIRMLOGIN':
      return {
        'confirmationResult' : action.confirmationResult
      };
    default:
      return state;
  };
};
