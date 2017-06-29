var express = require('express');
var fs = require('fs');

function Cleaner(pinCollection){

    this.getCleanCollection = function() {
        var newCollection = [];

        for (var x = 0; x < pinCollection.length - 2; x+=2 ){
            newCollection[x/2] = pinCollection[x];
        }

        return newCollection;
    }

}

module.exports = Cleaner;