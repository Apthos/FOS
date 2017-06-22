var express = require('express');
var fs = require('fs');

function Cleaner(pinCollection){
    var newCollection = [];
    var priorPin = null;

    pinCollection.forEach(function(pin){
        if (priorPin === null){
            priorPin = pin;
            return;
        } else {
            newCollection.push(priorPin);
        }

        console.log('Comparing: ' + pin.toString() + " to " + priorPin.toString());
        if (pin.TimeStamp == priorPin.TimeStamp && pin.latitude == priorPin.latitude
        && pin.longitude == pin.longitude){
             console.log("duplicate");
            return;
        } else {
            priorPin = pin;
        }

    });

    console.log("new Collection: " + String(newCollection.length));
}

module.exports = Cleaner;