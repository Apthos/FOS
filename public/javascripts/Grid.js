try { var express = require('express');
    var Chunk = require('Chunk');
} catch (e) {}


// Long N & S
// Lat Left & Right

// the Object Grid
// is passing all
    function Grid(H_Lat, L_Lat, H_Long, L_Long, Density, pins, map) {

        chunkCollection = [];
        for (var a = 0; a < Density; a++){
            chunkCollection.push(new Array(Density));
        }

// solve for distance

        var recWidth = (H_Long - L_Long) / Density;
        var recHeight = (H_Lat - L_Lat) / Density;
// the distance from point 10 and point 4 is
// Density is how many rectangles will be on screen.


        for (var x = 0; x < Density; x++) {
            for (var y = 0; y < Density; y++) {
                // Creates the boundary, lowest point with lowest corner
                // to create a side of the cube.
                // merge the google maps.


                console.log(x + " " + y);
                chunkCollection[x][y] = new Chunk(L_Lat + (recHeight * y), L_Long + (recWidth * x),
                    L_Lat + (recHeight * (y + 1)), L_Long + (recWidth * (x + 1)), map);
            }
        }

        pins.forEach(function(p){
            lat_index = (p.Latitude - L_Lat)/recWidth;
            long_index = (p.Longitude - L_Long)/recHeight;

            chunkCollection[lat_index][long_index]
        });

        console.log("Width: " + recWidth + " Height: " + recHeight);
        // find length divide by density

        this.getChunk = function(x, y){
            try {
                var chunk = chunkCollection[x][y];
            } catch (e){
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
