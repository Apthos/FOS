try { var express = require('express');
    var Chunk = require('Chunk');
} catch (e) {}


// Long N & S
// Lat Left & Right

// the Object Grid
// is passing all

    function Grid(H_Lat, L_Lat, H_Long, L_Long, Density, pins, map) {

    lat_extend = (H_Lat - L_Lat) * .025;
    long_extend = (H_Long - L_Long) * .025;

    H_Lat += lat_extend;
    L_Lat -= lat_extend;
    H_Long += long_extend;
    L_Long -= long_extend;


        chunkCollection = [];

        for (var a = 0; a <= Density; a++) {
            chunkCollection.push(new Array(Density));
        }

// solve for distance

        var recWidth = (H_Lat - L_Lat) / Density; // Long side
        var recHeight = (H_Long - L_Long) / Density; // Lat side
// the distance from point 10 and point 4 is
// Density is how many rectangles will be on screen.


        for (var x = 0; x < Density; x++) {
            for (var y = 0; y < Density; y++) {
                // Creates the boundary, lowest point with lowest corner
                // to create a side of the cube.
                // merge the google maps.

                console.log("runtime: " + x + " " + y);
                chunkCollection[x][y] = new Chunk(L_Lat + (recWidth * y), L_Long + (recHeight * x),
                    L_Lat + (recWidth * (y + 1)), L_Long + (recHeight * (x + 1)), map);
            }
        }
        /*The current problem is that the square values are off
        * the value goes up to 21
        * it should be stopping at 19
        * values are messed with at line 35 -- chunkCollection[x][y]*/

        pins.forEach(function (p) {
            var lat_index = (p.Latitude - L_Lat) / recWidth;
            var long_index = (p.Longitude - L_Long) / recHeight;

            lat_index = parseInt(lat_index);
            long_index = parseInt(long_index);

            try {
                chunkCollection[long_index][lat_index].addPin(p);
            } catch(e) {
                var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(p.Latitude, p.Longitude),
                    map: map
                });
            }

        });
        // chunkCollection
        chunkCollection.forEach(function(row){
            row.forEach(function (chunk) {
                chunk.draw(map);
            });
        });

        console.log("Width: " + recWidth + " Height: " + recHeight);
        // find length divide by density

        this.getChunk = function (x, y) {
            try {
                if (chunkCollection){

                }
                var chunk = chunkCollection[x][y];
            } catch (e) {
                console.log("Out of bounds!");
            }
            return chunk;
        }

    }

try {
    module.exports = Grid;
} catch (e){
    /* nothing */
}
