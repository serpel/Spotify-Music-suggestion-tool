var dotenv = require('dotenv');
var express = require('express');
var request = require('request'); // "Request" library
var cors = require('cors');
var querystring = require('querystring');
var cookieParser = require('cookie-parser');

const result = dotenv.config();
var app = express();

if (result.error) {
    throw result.error
}

console.log(result.parsed)

var server = app.listen(8888, function(){
    console.log(`server running at - ${server.address().address}:${server.address().port}`);
})

app.get("/", function(){

})

app.get("/v1/login", function(req, res){

})

app.post("/v1/playlist/new", function(req, res){

})

app.put("/v1/playlist/:id", function(req, res){

})

app.get("/v1/player/play/:trackId", function(req, res){

})