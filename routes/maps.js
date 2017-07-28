var express = require('express');
var router = express.Router();
var Pin = require('../public/javascripts/Pin');
var Grid = require('../public/javascripts/Grid');
var Cleaner = require('../public/javascripts/Cleaner');

var loader = require('../public/javascripts/Loader').getInstance();
//loader.cleanSet(true, true); # not needed since set is already clean

var grid = new Grid(loader.getCurrentSet(), 100);

var farms = grid.getFarms();

farms[3].writeCSV();

router.get('/', function(req, res, next) {
    res.render('maps', {
        collections: {
            farms: JSON.stringify(farms),
            points: JSON.stringify(loader.points())
        }
    });
});

module.exports = router;
