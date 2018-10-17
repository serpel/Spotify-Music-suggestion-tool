var express = require('express');

var app = express();

var server = app.listen(8090, function(){
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