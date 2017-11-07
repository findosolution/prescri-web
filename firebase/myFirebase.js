var firebase = require('firebase');

try {
  var config = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    databaseURL: process.env.DATABASE_URL,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MASSAGING_SENDER_ID
  };

  firebase.initializeApp(config);
} catch (e) {

}

module.exports = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
  firebaseRef: firebase.database().ref(),
  firebase: firebase
};
