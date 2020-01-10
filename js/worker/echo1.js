onconnect = function(e) {
    var port = e.ports[0];
    port.onmessage = function(e) {
        d=e.data
        port.postMessage(d);
        console.log('->',d)
    }
    port.start();
}

onmessageerror=console.log
