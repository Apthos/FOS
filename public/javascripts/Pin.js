try { var express = require('express');
} catch (e) { /* nothing */ }

function Pin(TimeStamp, Latitude, Longitude, IMEI, ScannedValue, Ranch, Pallet, Quality){
    this.TimeStamp = TimeStamp;
    this.Latitude = Latitude;
    this.Longitude = Longitude;
    this.IMEI = IMEI;
    this.ScannedValue = ScannedValue;
    this.Ranch = Ranch;
    this.Pallet = Pallet;
    this.Quality = parseFloat(Quality);

    this.Date = null;

    this.toString = function () {
        return  "LAT:" + String(Latitude) + '/LONG:' +
                String(Longitude);
    };

    this.isValid = function(){
        return (String(this.Latitude) != 'NaN' || String(this.Longitude) != 'NaN')
    };

    this.serialize = function(){
        return this.TimeStamp + "," + this.Latitude + "," + this.Longitude + "," + this.IMEI +
                "," + this.ScannedValue + "," + this.Ranch + ',' + this.Pallet + ',' + this.Quality;
    };

    this.setDate =  function(date){
        this.Date = date;
    };

}

try { module.exports = Pin;
} catch (e) { /* nothing */ }