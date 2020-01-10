var http     = require('http')
  , httpServ = http.createServer()
  , mosca    = require('mosca')
  , mqttServ = new mosca.Server({});

mqttServ.attachHttpServer(httpServ);

httpServ.listen(3000);
