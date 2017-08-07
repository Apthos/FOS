try { var express = require('express')
} catch (e){ /* nothing */ }

function Anal(farm){

    this.init = function(){
        var grid = farm.createGrid(5);
        var proChunks = grid.getProcessedChunks();
    };

    this.convertSeconds = function(seconds){
        seconds = parseFloat(seconds);
        return [Math.floor(seconds / 3600), Math.floor(seconds % 3600 / 60), Math.floor(seconds % 3600 % 60),
            Math.floor((((seconds % 3600) % 60) / 10))];
    };



    this.init();
}

try { module.exports = Anal;
} catch (e) { /* nothing */ }