var moment = require('moment');
var myFirebase = require.main.require('./firebase/myFirebase');
var constants = require.main.require('./constants/orderConstants');

exports.addOrder = function(req, res) {
  var order = req.body;
  order.createdAt = moment().unix();
  order.completedAt = null;
  order.status = constants.status.NEW;
  var orderer = order.orderby;
  var receiver = order.receivedby;
  
  var ordersRefOrderer = myFirebase.firebaseRef.child(`users/${orderer}/orders`);
  var orderRef = ordersRefOrderer.push(order);

  var ordersRefReceiver = myFirebase.firebaseRef.child(`users/${receiver}/orders`);
  var receiverRef = ordersRefReceiver.push(order);

  receiverRef.then((snapshot) => {
    ordersRefReceiver.child(receiverRef.key).update({referenceOrder: orderRef.key});
  }, (e) => {
    console.log('error when updating receiverRef');
  });

  orderRef.then((snapshot) => {
    ordersRefOrderer.child(orderRef.key).update({referenceOrder: receiverRef.key});
    order.referenceOrder = receiverRef.key;
    order.id = orderRef.key;
    res.json(order);
  }, (e) => {
    console.log('error when updating orderRef');
    res.json(e);
  });
};

exports.getOrders = function(req, res) {
  var uid = req.params.uid;
  var orderRef = myFirebase.firebaseRef.child(`users/${uid}/orders`);

  return orderRef.once('value').then((snapshot) => {
    var orders = snapshot.val() || {};
    var passedOrders = [];

    Object.keys(orders).forEach((orderId) => {
      var order = orders[orderId];
      order.id = orderId;
      passedOrders.push(order)
    });

    res.json(passedOrders);
  }, (e) => {
    console.log('error when loading orders' + e);
    res.json(e);
  });
};
