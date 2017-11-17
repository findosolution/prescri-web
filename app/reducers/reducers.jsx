export var orderReducer = (state = [], action) => {
  switch (action.type) {
    case 'LOAD_ORDERS':
      return[
        ...state,
        ...action.orders
      ];
    case 'ADD_ORDER':
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
  console.log(action.user);
  switch (action.type) {
    case 'LOGIN':
      return action.user
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

export var errorReducer = (state =[], action) => {
  switch (action.type) {
    case 'ERROR_OCCURED':
      return [
        ...state,
        action.errorObj
      ];

    default:
      return state;

  }
};
