try {
    var express = require('express');
    var fs = require('fs');
} catch (e){ /* nothing */ }


function Boundary(posts){
    this.posts = posts;

    this.addPost = function(post){
        this.posts.push(post);
    };

    this.draw = function(map, color) {
        var bounds = [];

        for (var i = 0; i < posts.length; i++){
            bounds.push(new google.maps.LatLng(posts[i][0], posts[i][1]))
        }

        var Boundary = new google.maps.Polygon({
            paths: bounds,
            fillColor: color
        });

        Boundary.setMap(map);

        return Boundary;
    };

}


try {
    module.exports = Boundary;
} catch (e) { /* nothing */ }
