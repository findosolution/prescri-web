var myFirebase = require.main.require('./firebase/myFirebase');

exports.addLocation = function(req, res) {
  var location = req.body;

  var locationRef = myFirebase.firebaseRef.child(`locations`).push(location);

  return locationRef.then((snapshot) => {
    location.id =  locationRef.key;
    return res.json(location);
  }, (err) => {
    res.body(err);
  });
};

exports.getLocations = function(req, res) {
  var locationRef = myFirebase.firebaseRef.child(`locations`);

  return locationRef.once('value').then((snapshot) => {
    var locations = snapshot.val() || {};
    var passedLocations = [];

    Object.keys(locations).forEach((id) => {

      var location = locations[id];
      console.log(location[id]);
      location.abbr = location.name;
      passedLocations.push(location);
    });

    return res.json(passedLocations);
  }, (err) => {
    return res.json(err);
  });
};
