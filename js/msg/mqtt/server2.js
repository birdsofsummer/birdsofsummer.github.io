var mosca = require("mosca");
var broker = new mosca.Server({});
var express = require("express");
var http = require("http");
var app = express()
var srv = http.createServer(app)
var path = require("path");

app.use(express.static(path.dirname(require.resolve("mosca")) + "/public"))

app.listen(3000)
