var mqtt  = require('mqtt');
var R =require('ramda')
const say=x=>y=>console.log(x,y)

class MqttClient{
    constructor(i="ddd"){
      var cfg={
            host:'mqtt://localhost',
            username:'',
            password:'',
            clientId:'app_13800000000'+i,
            onconnect:say('connect'),
            onmessage:say('msg'),
        }
        var client  = mqtt.connect(cfg.host,cfg);
        client.on('connect',cfg.onconnect);
        client.on('message',cfg.onmessage);
        this.client=client
    }
    sub(topic="zzz"){
        this.client.subscribe(topic)
    }
    send(msg="hello",topic="zzz",){
        this.client.publish(topic,msg)
    }
}

test=()=>{
    for (i=0;i