var instance = null;
var Pin = require('./Pin');
var Cleaner = require('./Cleaner');

function Loader(fpath) {

    var collection = [];

    this.initialize = function () {

        collection = [];

        var file = fpath.split('/')[4];


        var lines = require('fs').readFileSync(fpath, 'utf-8')
            .split('\n')
            .filter(Boolean);

        for (var i = 0; i < lines.length; i++) {

            var pieces = lines[i].split(',');


            if (file != 'set1.txt') {
                var p = new Pin(pieces[1], parseFloat(pieces[2]),
                    parseFloat(pieces[3]), pieces[4], pieces[5], pieces[8]);
            } else {
                var p = new Pin(pieces[0], parseFloat(pieces[1]),
                    parseFloat(pieces[2]), pieces[3], pieces[4], pieces[7]);
            }

            collection.push(p);
        }
    };

    this.cleanSet = function (cleaning, writing) {
        var cleaner = new Cleaner(collection, cleaning, writing);
    };

    this.getCurrentSet = function () {
        return collection;

    }

    this.initialize();

}

var latestFile;

function getLatestSet() {
    var fs = require('fs');
    var L = Number.MIN_VALUE;
    var items = fs.readdirSync(__dirname + '/../data', 'utf8');
    for (var i = 0; i < items.length; i++) {
        if (parseInt(items[i][3]) > L) {
            latestFile = __dirname + '/../data/' + items[i];
            L = parseInt(items[i][3]);
        }
    }
    console.log(latestFile);
    return latestFile;
}

module.exports.getInstance = function () {
    if (instance === null) {
        instance = new Loader(getLatestSet());
    }
    return instance;
};