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

var spawn = require("child_process").spawn;
var process = spawn('python',["../public/python/test1.py", "anything"]);

process.stdout.on('data', function (data){
console.log(data.toString());
});

router.get('/', function(req, res, next) {
    res.render('maps', {
        collections: {
            farms: JSON.stringify(farms)
        }
    });
});

module.exports = router;
