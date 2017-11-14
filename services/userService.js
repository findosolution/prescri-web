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

  userRef.once('value', function(snapshot) {
    if (snapshot.val()) {
      console.log('user exists');
      var savedUser = snapshot.val();
      savedUser.id = snapshot.key;
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
  res.json('getUser');
};

exports.updateUser = function(req, res) {
  res.json('updateUser');
};

exports.deleteUser = function(req, res) {
  res.json('deleteUser');
};
