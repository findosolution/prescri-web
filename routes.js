var express = require('express');

var userService = require('./services/userService');
var orderService = require('./services/orderService');
var pharmacyService = require('./services/pharmacyService');
var locationService = require('./services/locationService');

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

router.route('/users').post(userService.addUserIfNotExists)
    .get(userService.getUsers);
router.route('/users/:uid').get(userService.getUser)
    .put(userService.updateUser)
    .delete(userService.deleteUser);

router.route('/users/:uid/orders').get(orderService.getOrders);
router.route('/users/:uid/orders/:id').put(orderService.updateOrder);

router.route('/:location/pharmacies').post(pharmacyService.addPharmacy)
    .get(pharmacyService.getPharmacies);
router.route('/:location/pharmacies/:id').get(pharmacyService.getPharmacy)
    .put(pharmacyService.updatePharmacy)
    .delete(pharmacyService.deletePharmacy);

router.route('/locations').post(locationService.addLocation)
    .get(locationService.getLocations);

module.exports = router;
