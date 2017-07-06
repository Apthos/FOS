var express = require('express');
var router = express.Router();
var Pin = require('../public/javascripts/Pin');
var Cleaner = require('../public/javascripts/Cleaner');
var path = require('path');

var collection = [];

var file = '/../public/data/set2.txt';

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream(__dirname + file)
});

file = file.split('/')[4];

lineReader.on('line', function (line) {
    var pieces = line.split(',');


    if (file != 'set1.txt') {
        var p = new Pin(pieces[1], parseFloat(pieces[2]),
            parseFloat(pieces[3]), pieces[4], pieces[5], pieces[8]);
    } else {
        var p = new Pin(pieces[0], parseFloat(pieces[1]),
            parseFloat(pieces[2]), pieces[3], pieces[4], pieces[7]);
    }
    collection.push(p);
});

var cleaner = null;

lineReader.on('close', function () {
  
    cleaner = new Cleaner(collection, false, false);

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
