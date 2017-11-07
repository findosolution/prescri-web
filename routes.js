var express = require('express');

var authService = require('./services/authService');

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

router.route('/auth').post(authService.authenticate)
    .get(authService.authenticate);

module.exports = router;