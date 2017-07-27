try { var express = require('express');
} catch (e) { /* nothing */ }

function Pin(TimeStamp, Latitude, Longitude, IMEI, ScannedValue, Ranch){
    this.TimeStamp = TimeStamp;
    this.Latitude = Latitude;
    this.Longitude = Longitude;
    this.IMEI = IMEI;
    this.ScannedValue = ScannedValue;
    this.Ranch = Ranch;

    this.toString = function () {
        return  "LAT:" + String(Latitude) + '/LONG:' +
                String(Longitude);
    };

    this.isValid = function(){
        return (String(this.Latitude) != 'NaN' || String(this.Longitude) != 'NaN')
    };

    this.serialize = function(){
        return this.TimeStamp + "," + this.Latitude + "," + this.Longitude + "," + this.IMEI +
                "," + this.ScannedValue + "," + this.Ranch;
    }

}

try { module.exports = Pin;
} catch (e) { /* nothing */ }