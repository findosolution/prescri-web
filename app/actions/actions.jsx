import {firebase, googleProvider} from 'myFirebase';
import OrderAPI from 'OrderAPI';

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
    return OrderAPI.addOrder(order).then((snapshot) => {
      dispatch(addOrder(order));
    }, (err) => {
      console.log(err);
    });

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

export var startLogin = (userObj) => {
  return (dispatch, getState) => {

    switch (userObj.method) {
      case 'USRPW':
        return firebase.auth().signInWithEmailAndPassword(userObj.userId, userObj.userPw).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;

            console.log(errorMessage, errorCode);
            // ...
        });

      case 'GOOGLE':
        return firebase.auth().signInWithPopup(googleProvider).then((result) => {
          //dispatch(login(result.user.uid));
          console.log('Auth worked', result);
        }, (error) => {
          console.log('Auth failed', error);
        });
      default:
        return userObj
    }
  };
};

export var logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export var passwordReset = (resetProps) =>{
  return {
    type: 'RESETPASSWORD',
    resetProps
  };
};

export var startPwReset = (emailMobile) => {

  return (dispatch, getState) => {
    var resetProps = {};
    var isEmailSent = false;
    return firebase.auth().sendPasswordResetEmail(emailMobile).then(function() {
      // Email sent.
      console.log('email was sent');
      isEmailSent = true;

      resetProps = {
        status : isEmailSent,
        email : emailMobile
      }
      dispatch(passwordReset(resetProps));

    }).catch(function(error) {
      // An error happened.
      console.log('An error happened',error);
      resetProps = {
        status : isEmailSent,
        email : emailMobile
      }

      dispatch(passwordReset(resetProps));
    });
  }

};

export var startSignUp = () => {
  return (dispatch, getState) => {

    firebase.auth().createUserWithEmailAndPassword('findosolution@gmail.com', '1qaz2wsx@').catch(function(error) {
    // Handle Errors here.
    //  var errorCode = error.code;
    //  var errorMessage = error.message;
    // ...
    });
    console.log('user have been created');
  }
}

export var startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then(() => {
      dispatch(logout());
      console.log('Logout success');
    });
  };
};
