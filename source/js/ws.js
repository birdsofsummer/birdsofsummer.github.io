//-----------------------------------------ws-----------------
const WS=`wss://service-afbgj3k2-1252957949.ap-hongkong.apigateway.myqcloud.com/release/ws`
//const WS="wss://echo.websocket.org/"

const conn=(u=WS,cb={})=>{
         const ws = new WebSocket(u)
         _.extend(ws,cb)
         return ws
}
const conn1=(u)=>{
     const subject = webSocket.webSocket(u);
     subject.subscribe( say('msg'),say('err'),say('done'))
     subject.next({message: 'some message'});
     //subject.complete(); // Closes the connection.
     //subject.error({code: 4000, reason: 'I think our app just broke!'});
     return subject
}

class Ws{
    constructor(){
        this.init()
    }
    init(){
        const cb={
            onopen:(e)=>{
                say('open')(e)
            },
            onmessage:say('msg'),
            onclose:say('close'),
            onerror:say('err'),
        }
        this.ws=conn(WS,cb)
    }
    reconn(){
       if (this.ws.readyState !=1) {
            this.ws.close()
            this.init()
        }
    }
    send(d={}){
        this.reconn()
        let d1=JSON.stringify(d)
        this.ws.send(d1)
    }
}

const test_ws=()=>{
    const ws = new WebSocket(WS)
    ws.onmessage=say('msg')
    ws.onopen=()=>{
        interval(2000)
        .pipe(
            map(x=> moment().format()),
            take(1),
        )
        .subscribe((x)=>{
            let d={ action:"test", payload:{time:x}, };
            say('ws')(d)
            ws.send(to_s(d))
        })
    }
}

