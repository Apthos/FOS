var express = require('express');
var router = express.Router();
var Pin = require('../public/javascripts/Pin');
var Cleaner = require('../public/javascripts/cleaner');
var path = require('path');

var collection = [];

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(__dirname + '/../public/data/set1.txt')
});

lineReader.on('line', function (line) {
    var pieces = line.split(',');

    var p = new Pin(pieces[1], parseFloat(pieces[2]),
        parseFloat(pieces[3]), pieces[4], pieces[5], pieces[8]);
    collection.push(p);
});

var cleaner = null;

lineReader.on('close', function () {
  
    cleaner = new Cleaner(collection, true, false);
    collection = cleaner.getCleanCollection();

});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('maps', {
        collections: {
            pins: JSON.stringify(collection)
        }
    });
});

module.exports = router;
