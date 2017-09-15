var express = require('express');
var fs = require('fs');


function Cleaner(pinCollection, cleaning, writing) {

    if (cleaning) {
        var dupCollection = [];
        var newCollection = [];
        var priorPin = null;

        if (writing) {
            var writingFile = getNewestWritable();
            fs.writeFile(writingFile, "", function (err) {
                if (err)
                    return console.log(err);
            });
        }

        pinCollection.forEach(function (pin) {

            if (priorPin === null) {
                priorPin = pin;
                dupCollection.push(priorPin);
            } else if (pin.Latitude === priorPin.Latitude && pin.Longitude === priorPin.Longitude) {
                priorPin = pin;
                dupCollection.push(priorPin);
            } else  {
                priorPin = pin;
                newCollection.push(priorPin);
                if (writing) {
                    fs.appendFile(writingFile, priorPin.serialize() + "\n", function (err) {
                        if (err) return console.log(err);
                    });
                }

            }
        });

        console.log("Duplicate Collection: " + dupCollection.length);
        console.log("Good Collection: " + newCollection.length);
        console.log("Duplicate + Good = " + (dupCollection.length + newCollection.length));
        console.log("Original Collection: " + pinCollection.length);

    }
}

function getNewestWritable() {
    var latestFile;
    var fs = require('fs');
    var L = Number.MIN_VALUE;
    var items = fs.readdirSync(__dirname + '/../data', 'utf8');
    for (var i = 0; i < items.length; i++) {
        if (parseInt(items[i][3]) > L) {
            latestFile = __dirname + '/../data/' + items[i];
            L = parseInt(items[i][3]);
        }
    }
    latestFile = __dirname + '/../data/set' + (L + 1) + ".txt";
    return latestFile;
}

module.exports = Cleaner;