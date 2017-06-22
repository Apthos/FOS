var express = require('express');

function Pin(TimeStamp, Latitude, Longitude, IMEI, ScannedValue, Ranch){
    this.TimeStamp = TimeStamp;
    this.Latitude = Latitude;
    this.Longitude = Longitude;
    this.IMEI = IMEI;
    this.ScannedValue = ScannedValue;
    this.Ranch = Ranch;

    this.toString = function () {
        return String(TimeStamp) + ', ' + String(Latitude) + ', ' +
                String(Longitude) + ',' + String(IMEI) + ', ' +
                String(ScannedValue) + ', ' + String(Ranch);
    }
}

module.exports = Pin;