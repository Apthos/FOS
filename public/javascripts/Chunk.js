try {
    var express = require('express');
    var fs = require('fs');
} catch (e){ /* nothing */
}
// Long1 and Long2 N&S
// latitudeLeft Right

// Lat = y coordinates points
// Long = x coordinates points

function Chunk(Lat1, Long1, Lat2, Long2, map){
// create the array
    this.pins = [];
    this.pinCount = 0;
//  array addPoint  pin == variable
    this.addPin = function(pin){

        this.pins.push(pin);
        this.pinCount += 1;
    }

    this.draw = function(map){
        console.log(this.pinCount);

        var color = '#fafffe';
        if(this.pinCount > 4){
            color = '#C70039';
            console.log("Is green");
        }else if(this.pinCount == 3){
            color = '#FF5733';
            console.log("Is not green");
        }else if(this.pinCount == 2){
            color = '#FFC300';
            console.log("Is not green");
        }else if(this.pinCount == 1){
            color = '#DAF7A6';
            console.log("Is not green");
        }

        var Boundary = new google.maps.Polygon({

            paths:[
                new google.maps.LatLng(Lat1,Long1),
                new google.maps.LatLng(Lat1,Long2),
                new google.maps.LatLng(Lat2,Long2),
                new google.maps.LatLng(Lat2,Long1)
            ],
            fillColor: color
        });

        Boundary.setMap(map);

    }
        // every chunk now has an assigned number. Get pins by the #
        this.getAmountofPins = function (){
            return this.pins.length;
        }



}

try {
    module.exports = Chunk;
} catch (e){ /* nothing */ }

