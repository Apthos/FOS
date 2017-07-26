try {
    var Chunk = require('./Chunk.js');
    var Farm = require('./Farm.js');
    var Pin = require('./Pin.js');
} catch (e) {console.log("Grid: Could not laod server side resources! " +
    "disregard if seeing this on client!");}


// Long N & S
// Lat Left & Right

// the Object Grid
// is passing all

function Grid(pins, density) {
    var H_Lat = -91;
    var L_Lat = 91;
    var H_Long = -181;
    var L_Long = 181;

    pins.forEach(function(pin){

        //console.log("Lat: " + pin.Latitude + " Long: " + pin.Longitude);

        if (pin.Latitude > H_Lat && pin.Latitude !== null) {
            H_Lat = pin.Latitude;
            console.log("New H_Lat: " + pin.Latitude);
        }

        if (pin.Latitude < L_Lat && pin.Latitude !== null){
            L_Lat = pin.Latitude;
            console.log("New L_Lat: " + pin.Latitude);
        }

        if (pin.Longitude > H_Long && pin.Longitude !== null){
            H_Long = pin.Longitude;
            console.log("New H_Long: " + pin.Longitude);
        }

        if (pin.Longitude < L_Long && pin.Longitude !== null) {
            L_Long = pin.Longitude;
            console.log("New L_Long: " + pin.Longitude);
        }

    });

    var lat_extend = (H_Lat - L_Lat) * .025;
    var long_extend = (H_Long - L_Long) * .025;

    H_Lat = H_Lat + lat_extend;
    L_Lat = L_Lat - lat_extend;
    H_Long = H_Long + long_extend;
    L_Long = L_Long - long_extend;

    //console.log("HLat: " + String(H_Lat) + " \ LLat: " + String(L_Lat));
    //console.log("HLong: " + String(H_Long) + " \ LLong: " + String(L_Long));

    var chunkCollection = [];

    for (var a = 0; a <= density; a++) {
        chunkCollection.push(new Array(density));
    }

// solve for distance

    var recHeight = (H_Lat - L_Lat) / density;
    var recWidth = (H_Long - L_Long) / density;

    //console.log("rec width: " + recWidth);
    //console.log("rec height: " + recHeight);

// the distance from point 10 and point 4 is
// Density is how many rectangles will be on screen.


    for (var x = 0; x < density; x++) {
        for (var y = 0; y < density; y++) {
            // Creates the boundary, lowest point with lowest corner
            // to create a side of the cube.
            // merge the google maps.

            chunkCollection[x][y] = new Chunk(x, y,
                recWidth, recHeight, L_Lat, L_Long);
        }
    }

    pins.forEach(function (p) {

        var lat_index = (p.Latitude - L_Lat) / recHeight;
        var long_index = (p.Longitude - L_Long) / recWidth;

        lat_index = parseInt(lat_index);
        long_index = parseInt(long_index);

        try {
            chunkCollection[long_index][lat_index].addPin(p);
        } catch (e) {
            console.log("valid: " + p.isValid());

            console.log("P| lat:" + p.Latitude + " long:" + p.Longitude);
            console.log("P| latI:" + lat_index + " longI:" + long_index);
            console.error("Data is not possible! Something fucked up");
        }

    });

    this.getChunk = function (x, y) {
        try {
            return chunkCollection[x][y];
        } catch (e) {
            console.log("Out of bounds!");
        }
    };

    this.getChunks = function() {
        var chunks = [];

        console.log(chunkCollection);

        for (var x = 0; x < density; x++) {
            for (var y = 0; y < density; y++) {
                if (!chunkCollection[x][y].isEmpty()){
                    chunks.push(chunkCollection[x][y]);
                }
            }
        }

        return chunks;
    };

    this.getFarms = function () {
        var farms = [];
        for (var x = 0; x < density; x++) {
            for (var y = 0; y < density; y++) {
                var chunk = chunkCollection[x][y];
                if (chunk !== null && !chunk.isEmpty()){
                    var chunks = chunk.getSurrounding(this, null);
                    var pins = [];
                    for (var i = 0; i < chunks.length; i++){
                        for (var ii = 0; ii < chunks[i].pins.length; ii++){
                            pins.push(chunks[i].pins[ii]);
                        }
                    }
                    var farm = new Farm(pins, false);
                    chunks.forEach(function(chunk){
                        chunkCollection[chunk.x][chunk.y] = new Chunk();
                    });
                    if (!(farm.pins.length < 100))
                        farms.push(farm);
                }
            }
        }
        return farms;
    };

    this.getCenter = function(){
        return {lat: L_Lat + ((H_Lat - L_Lat)/2), lng: L_Long + ((H_Long - L_Long)/2)};
    }
}

try {
    module.exports = Grid;
} catch (e) {
    /* nothing */
}
