var moment = require('moment');
var myFirebase = require.main.require('./firebase/myFirebase');

exports.addUser = function(req, res) {
  var user = req.body;
  user.createdAt = moment().unix();
  var uid = user.uid;
  var userRef = myFirebase.firebaseRef.child(`users`);

  userRef.once('value', function(snapshot) {
    if (snapshot.hasChild(uid)) {
      console.log('user exists');
    } else {
      return userRef.child(uid).push(user).then((snapshot) => {
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
