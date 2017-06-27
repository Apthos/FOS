var express = require('express');
var Chunk = require('Chunk');

// latitude N & S
function Grid(H_Lat, L_Lat, H_Long, L_Long, Density, map){

    chunkCollection = [];

    var Width= (H_Long - L_Long)/Density;
    var Height = (H_Lat - L_Lat)/Density;

    //Density is how many rectangles will be on screen.
    for (var x = 0; x<= Density; x++) {
        for (var y = 0; y <= Density; y++) {
            /* Written by LIES © */


            // Creates the boundary, lowest point with lowest corner
            // to create a side of the cube.
            chunkCollection.push(new Chunk(L_Lat + (Height * y), L_Long + (Width * x),
                L_Lat + (Height * (y+1)), L_Long + (Width * (x+1)), map));
        }
    }

    console.log("Width: " + Width + " Height: " + Height);
    // find length divide by density

}

module.exports = Grid;