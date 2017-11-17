var moment = require('moment');
var myFirebase = require.main.require('./firebase/myFirebase');

exports.addUserIfNotExists = function(req, res) {
  var user = req.body;
  user.createdAt = moment().unix();
  var uid = user.uid;
  if(user.isPharmacy && user.isPharmacy === true) {
    user.isPharmacy = true;
  } else {
    user.isPharmacy = false;
  }

  var userRef = myFirebase.firebaseRef.child(`users/${uid}/profile`);

  userRef.once('value', (snapshot) => {
    if (snapshot.val()) {
      console.log('user exists');
      var userKey = Object.keys(snapshot.val())[0];
      var data = snapshot.val();
      var savedUser = data[userKey];
      savedUser.id = userKey;

      return res.json(savedUser);
    } else {
      return userRef.push(user).then((snapshot) => {
        user.id =  userRef.key;
        console.log(user);
        return res.json(user);
      }, (err) => {
        res.body(err);
      });
    }
  });
};

exports.getUsers = function(req, res) {
  res.json('getUsers');
};

exports.getUser = function(req, res) {
  var uid = req.params.uid;
  var userRef = myFirebase.firebaseRef.child(`users/${uid}/profile`);

  userRef.once('value', (snapshot) => {
    if (snapshot.val()) {
      var userKey = Object.keys(snapshot.val())[0];
      var data = snapshot.val();
      var savedUser = data[userKey];
      savedUser.id = userKey;

      return res.json(savedUser);
    } else {
      console.log('user not exists');
      return res.json('error');
    }
  });
};

exports.updateUser = function(req, res) {
  res.json('updateUser');
};

exports.deleteUser = function(req, res) {
  res.json('deleteUser');
};
