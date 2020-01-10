onmessage = function(e) {
    d=e.data
    postMessage(d);
    console.log('->',d);
}

