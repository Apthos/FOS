var express = require('express');
var fs = require('fs');


function Cleaner(pinCollection, cleaning, writing) {

    if (cleaning) {
        var dupCollection = [];
        var newCollection = [];
        var priorPin = null;

        if (writing) {
            fs.writeFile(getNewestWritable(), "", function (err) {
                if (err)
                    return console.log(err);
            });
        }

        pinCollection.forEach(function (pin) {
            if (priorPin === null || (pin.TimeStamp == priorPin.TimeStamp
                && pin.latitude == priorPin.latitude && pin.longitude == priorPin.longitude)) {
                priorPin = pin;
                dupCollection.push(priorPin);
            } else {
                priorPin = pin;
                newCollection.push(priorPin);
                if (writing) {
                    fs.appendFile(getNewestWritable(), priorPin + "\n", function (err) {
                        if (err) return console.log(err);
                    });
                }

            }
        });

        console.log("Duplicate Collection: " + dupCollection.length);
        /* fs = require('fs');
         fs.writeFile('../public/data/bad.txt', dupCollection + "\n", function (err) {
         if (err)
         return console.log(err);
         }); */
        console.log("Good Collection: " + newCollection.length);
        /* fs = require('fs');
         fs.writeFile('../public/data/good.txt', newCollection + "\n", function (err) {
         if (err)
         return console.log(err);
         }); */
        console.log("Duplicate + Good = " + (dupCollection.length + newCollection.length));
        console.log("Original Collection: " + pinCollection.length);

    }
}

function getNewestWritable() {
    var latestFile = "";
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