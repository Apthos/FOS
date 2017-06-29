var express = require('express');
var router = express.Router();
var Pin = require('../public/javascripts/pin');
var Cleaner = require('../public/javascripts/cleaner');
var path = require('path');
var bspline = require('b-spline');

var points = [
    [-1.0,  0.0],
    [-0.5,  0.5],
    [ 0.5, -0.5],
    [ 1.0,  0.0]
];

var degree = 2;

for(var t=0; t<1; t+=0.01) {
    var point = bspline(t, degree, points);
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('spline', {
        scripts: [bspline]
    });
});

module.exports = router;
