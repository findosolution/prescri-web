var myFirebase = require.main.require('./firebase/myFirebase');

exports.authenticate = function(req, res) {
  myFirebase.firebase.auth().signInWithPopup(myFirebase.googleProvider).then((result) => {
    console.log('Auth worked', result);
    return result;
  }, (error) => {
    console.log('Auth failed', error);
    return null;
  });
};
