var myFirebase = require.main.require('./firebase/myFirebase');

exports.addOrder = function(req, res) {
  var order = req.body;
  var uid = order.uid;
  var orderRef = myFirebase.firebaseRef.child(`users/${uid}/orders`).push(order);

  return orderRef.then(() => {
    return res.json('SUCCESS');
  }, (err) => {
    res.body(err);
  });
};

exports.getOrders = function(req, res) {
  res.json('getOrders');
};
