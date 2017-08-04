var express = require('express');
var router = express.Router();
var Pin = require('../public/javascripts/Pin');
var Grid = require('../public/javascripts/Grid');
var Cleaner = require('../public/javascripts/Cleaner');

var loader = require('../public/javascripts/Loader').getInstance();
//loader.cleanSet(true, true); # not needed since set is already clean

router.get('/', function(req, res, next) {
    res.render('maps', {
        collections: {
            farms: JSON.stringify(loader.getFarms())
        }
    });
});

module.exports = router;
