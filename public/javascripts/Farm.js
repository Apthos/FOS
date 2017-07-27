try {
    var express = require('express');
    var fs = require('fs');
} catch (e){ /* nothing */ }

function Farm(pins, bypass){
    this.pins = [];
    this.bypass = false;

    this.boundary = null;

    var H_Lat = null;
    var L_Lat = null;
    var H_Long = null;
    var L_Long = null;

    function initialize(instance){
        pins.forEach(function(pin){
           instance.addPin(pin);
        });
    }

    this.getPins = function (){
        return pins;
    };

    this.addPin = function(pin){
        this.pins.push(pin);

        if (H_Lat === null && pin !== null){
            H_Lat = pin;
            L_Lat = pin;
            H_Long = pin;
            L_Long = pin;
        }

        if ((H_Lat === null) || (pin.Latitude !== null && pin.Latitude > H_Lat.Latitude)) H_Lat = pin;
        if ((L_Lat === null) || (pin.Latitude !== null && pin.Latitude < L_Lat.Latitude)) L_Lat = pin;
        if ((H_Long === null) || (pin.Longitude !== null && pin.Longitude > H_Long.Longitude)) H_Long = pin;
        if ((L_Lat === null) || (pin.Longitude !== null && pin.Longitude < L_Long.Longitude)) L_Long = pin;

    };

    this.toString = function(){
        console.log("{");

        this.pins.forEach(function(chunk){
           console.log("(x:" + chunk.x + ", y:" + chunk.y  + "), \n");
        });

        console.log("}");
    };

    this.drawBounds = function(map){

        var color = '#8d8d8d';

        if (this.hasBoundary()){

        } else {
            var Boundary = new google.maps.Polygon({
                paths: [
                    new google.maps.LatLng(H_Lat.Latitude, H_Lat.Longitude),
                    new google.maps.LatLng(H_Long.Latitude, H_Long.Longitude),
                    new google.maps.LatLng(L_Lat.Latitude, H_Lat.Longitude),
                    new google.maps.LatLng(L_Long.Latitude, L_Long.Longitude)
                ],
                fillColor: color
            });

            Boundary.setMap(map);
        }
        // var that = this;
        // google.maps.event.addDomListener(Boundary, 'click', function (e) {
        //     console.log("Clicking Farm");
        // });

    };

    this.getCenter = function(){
        return {lat: L_Lat.Latitude + ((H_Lat.Latitude - L_Lat.Latitude)/2), lng: L_Long.Longitude + ((H_Long.Longitude - L_Long.Longitude)/2)};
    };

    this.allowBypass = function(allow) {
        this.bypass = allow;
    };

    this.hasBoundary = function(){
        return (this.boundary === null);
    };

    this.setBoundary = function (boundary) {
        this.boundary = boundary;
    };

    initialize(this);

    this.writeCSV = function(){
        var writingFile = __dirname + "/../data/farm.csv";

        fs.writeFile(writingFile, "", function (err) {
            if (err) return console.log(err);
        });

        for (var i = 0; i < pins.length; i++){
            var data = String(pins[i].Latitude);
            fs.appendFileSync(writingFile, data);

            if (i < pins.length - 1){
                fs.appendFileSync(writingFile, ',');
            } else {
                console.log("new line!");
                fs.appendFileSync(writingFile, '\n');
            }
        }

        for (var i = 0; i < pins.length; i++){
            var data = String(pins[i].Longitude);
            fs.appendFileSync(writingFile, data);

            if (i < pins.length - 1){
                fs.appendFileSync(writingFile, ',');
            } else {
                fs.appendFileSync(writingFile, '\n');
            }
        }

    }
}

try {
    module.exports = Farm;
} catch (e) { /* nothing */ }
