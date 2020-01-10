say=x=>y=>console.log(x,y)
var evtSource=new EventSource("demo_sse.php");
evtSource.onmessage = console.log
evtSource.addEventListener("ping",say('ping') , false);
