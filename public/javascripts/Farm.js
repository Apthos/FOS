try {
    var express = require('express');
    var fs = require('fs');
} catch (e){ /* nothing */ }

function Farm(pins){
    this.pins = pins;

    this.getPins = function (){
        return pins;
    };

    this.addPin = function(pin){
        this.pins.push(pin);
    };

    this.toString = function(){
        console.log("{");

        this.pins.forEach(function(chunk){
           console.log("(x:" + chunk.x + ", y:" + chunk.y  + "), \n");
        });

        console.log("}");
    }

}

try {
    module.exports = Farm;
} catch (e) { /* nothing */ }
