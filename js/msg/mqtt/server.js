var mosca = require('mosca');


var ascoltatore = {
  type: 'mongo',
  url: 'mongodb://localhost:27017/mqtt',
  pubsubCollection: 'ascoltatori',
  mongo: {}
};


ws={
  http: {
    port: 3000,
    bundle: true,
    static: './'
  }
}

const cfg={
    port: 1883,
    backend: ascoltatore,
}
var MqttServer = new mosca.Server(ws);
const say=x=>y=>console.log(x,y)

MqttServer.on('clientConnected', say("connected"));
MqttServer.on('published', say('pub'));
MqttServer.on('ready', function(){
    console.log(cfg);
    //MqttServer.authenticate = authenticate;
});
