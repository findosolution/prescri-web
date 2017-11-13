var express = require('express');

var userService = require('./services/userService');
var orderService = require('./services/orderService');

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('A request came!');
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get('/', function(req, res) {
    res.json({ message: 'Prescription api' });
});

router.route('/orders').post(orderService.addOrder);

router.route('/users').post(userService.addUser)
    .get(userService.getUsers);
router.route('/users/:uid').get(userService.getUser)
    .put(userService.updateUser)
    .delete(userService.deleteUser);

router.route('/users/:uid/orders').get(orderService.getOrders);

module.exports = router;
