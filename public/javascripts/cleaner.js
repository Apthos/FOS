var express = require('express');
var fs = require('fs');

function Cleaner(pinCollection){
    var dupCollection = [];
    var newCollection = [];
    var priorPin = null;

    // Creates file
    fs = require('fs');
    fs.writeFile('../public/data/set2.txt', "", function (err) {
        if (err)
            return console.log(err);
    });

    pinCollection.forEach(function(pin){
        if (priorPin === null || pin != priorPin && pin.TimeStamp == priorPin.TimeStamp && pin.latitude == priorPin.latitude
        && pin.longitude == priorPin.longitude){
            priorPin = pin;
            dupCollection.push(priorPin);
        } else {
            priorPin = pin;
            newCollection.push(priorPin);
            fs.appendFile('../public/data/set2.txt', priorPin + "\n", function (err) {
                if (err) return console.log(err);
            });
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
module.exports = Cleaner;