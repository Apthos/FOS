var express = require('express');
var router = express.Router();
var Pin = require('../public/javascripts/Pin');
var Grid = require('../public/javascripts/Grid');
var Cleaner = require('../public/javascripts/Cleaner');
var path = require('path');

var loader = require('../public/javascripts/Loader').getInstance();
loader.cleanSet(true, true);

var grid = new Grid(loader.getCurrentSet(), 100);

var farms = grid.getFarms();




router.get('/', function(req, res, next) {
    res.render('maps', {
        collections: {
            farms: JSON.stringify(farms)
        }
    });
});

module.exports = router;
