import { firebase, googleProvider } from 'myFirebase';
import OrderAPI from 'OrderAPI';
import UserAPI from 'UserAPI';
import LocationAPI from 'LocationAPI';

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
    var newOrder = {
      ...order,
      orderby: getState().user.uid
    };
    return OrderAPI.addOrder(newOrder).then((snapshot) => {
      dispatch(addOrder(snapshot));
    }, (err) => {
      console.log(err);
    });
  };
};

export var updateOrder = (updates) => {
  return {
    type: 'UPDATE_ORDER',
    updates
  };
};

export var startUpdateOrder = (updates) => {
  return (dispatch, getState) => {
    var update = {
      ...updates,
      uid: getState().user.uid
    };
    return OrderAPI.updateOrder(update).then((snapshot) => {
      dispatch(updateOrder(snapshot));
    }, (err) => {
      console.log(err);
    });
  };
};

export var loadLocations = (locations) => {
  return {
    type: 'LOAD_LOCATIONS',
    locations
  };
};

export var startLoadLocations = () => {
  return (dispatch, getState) => {
    return LocationAPI.getLocations().then((snapshot) => {
      dispatch(loadLocations(snapshot));
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

export var clearError = () => {
  return {
    type: 'CLEAR_ERROR'
  }
};

export var login = (user) => {

  return {
    type: 'LOGIN',
    user
  };
};

export var confirmLogin = (confirmationResult) => {
  return {
    type: 'CONFIRMLOGIN',
    confirmationResult
  }
};

export var startConfirmingLogin = (code, confirmationResult) => {

  return (dispatch, getState) => {
    window.confirmationResult = confirmationResult;
    window.confirmationResult.confirm(code).then(function (result) {

      var user = {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email
      };

      return UserAPI.registerIfNot(user).then((snapshot) => {
        dispatch(addOrder(snapshot));
      }, (err) => {
        console.log(err);
      });
    }).catch(function (error) {
      console.log(error);
    });

  }
};

export var startLogin = (userObj) => {
  return (dispatch, getState) => {

    switch (userObj.method) {
      case 'USRPW':
        return firebase.auth().signInWithEmailAndPassword(userObj.userId, userObj.userPw).catch(function (error) {
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

          }, (err) => {
            console.log(err);
          });
        }, (error) => {
          var errorObj = {
            'action': 'signInWithPopup',
            'errorCode': error.code,
            'errorMessage': error.message
          }
          dispatch(addError(errorObj));
        });

      case 'MOBILE':
        return firebase.auth().signInWithPhoneNumber(userObj.userId, userObj.recaptchaVerifier)
          .then(function (confirmationResult) {
            dispatch(confirmLogin(confirmationResult));
          }).catch(function (error) {
            var errorObj = {
              'action': 'signInWithPhoneNumber',
              'errorCode': error.code,
              'errorMessage': error.message
            }
            dispatch(addError(errorObj));
          });

      default:
        return userObj
    }
  };
};

export var doLogin = (uid) => {
  return (dispatch, getState) => {
    return UserAPI.getUser(uid).then((snapshot) => {
      dispatch(login(snapshot));
    }, (err) => {
      console.log(err);
    });
  };
};

export var logout = () => {
  return {
    type: 'LOGOUT'
  };
};

export var passwordReset = (resetProps) => {
  return {
    type: 'RESETPASSWORD',
    resetProps
  };
};

export var startPwReset = (emailMobile) => {

  return (dispatch, getState) => {
    var resetProps = {};
    var isEmailSent = false;
    return firebase.auth().sendPasswordResetEmail(emailMobile).then(function () {
      // Email sent.
      console.log('email was sent');
      isEmailSent = true;

      resetProps = {
        status: isEmailSent,
        email: emailMobile
      }
      dispatch(passwordReset(resetProps));

    }).catch(function (error) {

      var errorObj = {
        'action': 'sendPasswordResetEmail',
        'errorCode': error.code,
        'errorMessage': error.message
      }
      dispatch(addError(errorObj));

    });
  }

};

export var addError = (errorObj) => {
  return {
    type: 'ERROR_OCCURED',
    errorObj
  };
};

export var startSignUp = (reg_user) => {
  return (dispatch, getState) => {

    firebase.auth().createUserWithEmailAndPassword(reg_user.email, reg_user.password).then((result) => {

      var user = {
        uid: result.uid,
        name: reg_user.firstname,
        email: result.email
      };
      return UserAPI.registerIfNot(user).then((snapshot) => {
        dispatch(addOrder(snapshot));
      }, (err) => {
        console.log(err);
      });

    }).catch(function (error) {

      var errorObj = {
        'action': 'createUserWithEmailAndPassword',
        'errorCode': error.code,
        'errorMessage': error.message
      }
      dispatch(addError(errorObj));

    });
  }
}

export var startLogout = () => {
  return (dispatch, getState) => {
    return firebase.auth().signOut().then(() => {

      dispatch(logout());
      console.log('Logout success');

    }).catch(function (error) {

      var errorObj = {
        'action': 'signOut',
        'errorCode': error.code,
        'errorMessage': error.message
      }
      dispatch(addError(errorObj));

    });;
  };
};
