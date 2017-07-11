try {
    var express = require('express');
    var fs = require('fs');
} catch (e){ /* nothing */ }

function Farm(chunks){
    this.chunks = chunks;

    this.toString = function(){
        console.log("{");

        chunks.forEach(function(chunk){
           console.log("(x:" + chunk.x + ", y:" + chunk.y  + "), \n");
        });

        console.log("}");
    }

}

try {
    module.exports = Farm;
} catch (e) { /* nothing */ }
