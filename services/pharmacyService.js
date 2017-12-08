var moment = require('moment');
var myFirebase = require.main.require('./firebase/myFirebase');

exports.addPharmacy = function(req, res) {
  var pharmacy = req.body;
  pharmacy.createdAt = moment().unix();
  var location = req.params.location;

  var pharmacyRef = myFirebase.firebaseRef.child(`pharmacies/${location}`);

  return pharmacyRef.push(pharmacy).then((snapshot) => {
    pharmacy.id =  pharmacyRef.key;
    return res.json(pharmacy);
  }, (err) => {
    res.body(err);
  });
};

exports.getPharmacies = function(req, res) {
  var location = req.params.location;

  var pharmacyRef = myFirebase.firebaseRef.child(`pharmacies/${location}`);

  return pharmacyRef.once('value').then((snapshot) => {
    var pharmacies = snapshot.val() || {};
    var passedPharmacies = [];

    Object.keys(pharmacies).forEach((id) => {
      var pharmacy = pharmacies[id];
      pharmacy.id = id;
      passedPharmacies.push(pharmacy);
    });

    return res.json(passedPharmacies);
  }, (err) => {
    return res.json(err);
  });
};

exports.getPharmacy = function(req, res) {
  res.json('getPharmacy');
};

exports.updatePharmacy = function(req, res) {
  res.json('updatePharmacy');
};

exports.deletePharmacy = function(req, res) {
  res.json('deletePharmacy');
};
