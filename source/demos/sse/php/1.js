say=x=>y=>console.log(x,y)
init=()=>{
    var evtSource=new EventSource("/time.php");
    evtSource.onopen=say('open')
    evtSource.onerror=say('err')
    evtSource.onmessage =say('msg')
    evtSource.addEventListener("ping",say('ping') , false);
}

