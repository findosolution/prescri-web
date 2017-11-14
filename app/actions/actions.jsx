import {firebase, googleProvider} from 'myFirebase';
import OrderAPI from 'OrderAPI';
import UserAPI from 'UserAPI';

export var loadOrders = (orders) => {
  return {
    type: 'LOAD_ORDERS',
    orders
  };
};

export var startLoadOrders = () => {
  return (dispatch, getState) => {
    return OrderAPI.getOrders(getState().user.uid).then((snapshot) => {
      dispatch(loadOrders(snapshot));
    }, (err) => {
      console.log(err);
    });
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
    order = {
      ...order,
      orderby: getState().user.uid
    };
    return OrderAPI.addOrder(order).then((snapshot) => {
      dispatch(addOrder(snapshot));
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

export var confirmLogin = (confirmationResult) => {
  return {
    type: 'CONFIRMLOGIN',
    confirmationResult
  }
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
          var user = {
            uid: result.user.uid,
            name: result.user.displayName,
            email: result.user.email
          };
          return UserAPI.registerIfNot(user).then((snapshot) => {
            console.log('signin', snapshot);
            dispatch(addOrder(snapshot));
          }, (err) => {
            console.log(err);
          });
        }, (error) => {
          console.log('Auth failed', error);
        });

      case 'MOBILE':
        return firebase.auth().signInWithPhoneNumber(userObj.userId, userObj.recaptchaVerifier)
            .then(function (confirmationResult) {
              dispatch(confirmLogin(confirmationResult));
            }).catch(function (error) {
              // Error; SMS not sent
              // ...
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
