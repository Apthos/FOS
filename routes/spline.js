var express = require('express');
var router = express.Router();
var Pin = require('../public/javascripts/pin');
var Cleaner = require('../public/javascripts/cleaner');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('spline', {
        scripts: [bspline]
    });
});

module.exports = router;
