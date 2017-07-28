try {
    var express = require('express');
    var fs = require('fs');
} catch (e){ /* nothing */ }


function Boundry(posts){
    this.posts = posts;

    this.addPost = function(post){
        this.posts.push(post);
    };

    this.draw = function(map){

    };

}


try {
    module.exports = Grid;
} catch (e) { /* nothing */ }
