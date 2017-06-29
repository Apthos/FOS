try {
    var express = require('express');
    var fs = require('fs');
} catch (e){ /* nothing */ }
// latitude N & S
// Lat1 and Lat2 are a reference to the two points that you

// Lat = y coordinates.
// Long = x coordinates.

function Chunk(Lat1, Long1, Lat2, Long2, map){

    var Boundary = new google.maps.Polygon({
        paths:[
        new google.maps.LatLng(Lat1,Long1),
        new google.maps.LatLng(Lat1,Long2),
        new google.maps.LatLng(Lat2,Long2),
        new google.maps.LatLng(Lat2,Long1)
        ]
    });

    // allows for you to see the Chunk onto the screen
    Boundary.setMap(map);
// create the array
    this.points = [];
//  array addPoint  pin == variable
    this.addPoint = function(pin){
        this.points.push(pin);
    }


}

try {
    module.exports = Chunk;
} catch (e){ /* nothing */ }

