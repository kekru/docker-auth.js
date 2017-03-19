var winston = require('winston');
var logger = new(winston.Logger)({
    transports: [
        new(winston.transports.Console)(),
        new(winston.transports.File)({filename: '/data/log.log'})
    ]
});

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
   
var log = new Array();

var defaultContentType = "application/vnd.docker.plugins.v1.1+json";

app.all("/AuthZPlugin.AuthZReq", function(req, res) {
    log.push(JSON.stringify(req.body));
    logger.info(req);

    var authRes = {
        Allow: false,
        Msg: "" + JSON.stringify(req.body),
        Err: "" + JSON.stringify(req.body)
    };

    res.header('Content-Type', defaultContentType);
    res.send(JSON.stringify(authRes));
});

app.all("/AuthZPlugin.AuthZRes", function(req, res) {
    log.push(JSON.stringify(req.body));
    logger.info(req);

    var authRes = {
        Allow: false,
        Msg: "" + JSON.stringify(req.body),
        Err: "" + JSON.stringify(req.body)
    };

    res.header('Content-Type', defaultContentType);
    res.send(JSON.stringify(authRes));
});

app.all("/Plugin.Activate", function(req, res) {
      
    res.header('Content-Type', defaultContentType);  
    res.send(JSON.stringify({Implements: ["authz"]}));
});



app.all("/info", function(req, res) {
      
    res.send(log);
});

app.listen('/run/docker/plugins/kekruauth.sock',
    function(){
        console.log("Service Auth gestartet");
        var fs = require('fs');
        fs.chmodSync('/run/docker/plugins/kekruauth.sock', 0666);
    });



/*
var http = require('http');

var log = new Array();


http.createServer(function (req, res) {

  //log.push(JSON.stringify(req));  
  console.log(req.body);

    var authRes = {
        Allow: false,
        Msg: "",
        Err: ""
    };

    res.end("" + log);

}).listen(80, //'/run/docker/plugins/kekruserviceauthz.sock', 
function(){
    console.log("Service Auth gestartet");
    //var fs = require('fs');
    //fs.chmodSync('/run/docker/plugins/kekruserviceauthz.sock', 0666);
});*/