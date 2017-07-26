var Pin = require('./Pin');
var Cleaner = require('./Cleaner');
var fs = require('fs');
var mongo = require('mongodb');
var MongoClient = mongo.MongoClient;

var instance = null;

function Loader(fpath) {

    var collection = [];

    this.initialize = function (path) {
        // var result = this.connectMongo("localhost", "27017", "Kevin", "Password", "admin");
        // console.log("Mongo: " + result);
        // // if (result){
        // //     // Continue doing mongo
        // // } else {
        // //     // use hard file since connection to mongo was not possible.
        // // }

        this.loadSet(path, false);

    };

    this.loadSet = function(set, format){

        if (format) {
            var file_dir = __dirname + '/../data/' + set;
        } else {
            var file_dir = set;
        }

        if (!fs.existsSync(file_dir)){
            console.error("'" + file_dir + "' does not exist!");
            return;
        }

        collection = [];

        var file = file_dir.split('/')[file_dir.split('/').length - 1];

        var lines = require('fs').readFileSync(file_dir, 'utf-8')
            .split('\n')
            .filter(Boolean);

        for (var i = 0; i < lines.length; i++) {
            var pieces = lines[i].split(',');

            if (file == 'set1.txt') {
                var p = new Pin(pieces[1], parseFloat(pieces[2]),
                    parseFloat(pieces[3]), pieces[4], pieces[5], pieces[8]);
            } else {
                var p = new Pin(pieces[0], parseFloat(pieces[1]),
                    parseFloat(pieces[2]), pieces[3], pieces[4], pieces[7]);
            }

            if (p.isValid()) {
                collection.push(p);
            } else {
                console.log("pin is not valid: " + p);
            }
        }

    };

    this.cleanSet = function (cleaning, writing) {
        var cleaner = new Cleaner(collection, cleaning, writing);
    };

    this.getCurrentSet = function () {
        return collection;
    };


    this.connectMongo = function(host, port, user, password, database){
        var url = "mongodb://" + user + ":" + password + "@" + host + ":" + port + "/" + database;
        MongoClient.connect(url, function(err, db) {
            if (err) {
                console.log("CONNECTION WAS NOT ESTABLISHED");
                return [false, db];
            } else {
                console.log("Connection was established")
            }

            db.createCollection("fos", function(err, res) {
                if (err) throw err;
            });

            var name = "kevin";

            db.collection('fos').insertOne({
                Person: {
                    Name: name,
                    age: 19,
                    hobbies: ["Programming", "Gaming", "Music"]
                }
            }, function(err, result) {
                if (err) throw err;
                console.log("Inserted a document into the restaurants collection.");
            });

            return [true, db];
        });
    };

    this.initialize(fpath);

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