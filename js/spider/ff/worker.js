
const send=(w,interval=7000,[h,...t])=>{
    if (h) {
        w.postMessage(h);
        setTimeout(()=>send(w,interval,t),interval)
    }else{
        console.log('done')
    }
}
//send(myWorker,7000,u)
const get_all=async function(){
    http_get=x=>fetch(x).then(y=>y.text())
    http_gets=(u=[])=>Promise.all(u.map(http_get))
    this.onmessage=async (e)=> {
        u=e.data
        console.log(u)
        d=await http_gets(u)
        postMessage(d)
    }

}

funtion sw(){
    this.addEventListener('fetch', event => {
      event.respondWith(new Response('hello world'))
    })
addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request.url + "/index.html", event.request)
  )
})


addEventListener('fetch', event => {
  let url = new URL(event.request.url)

  if (event.request.headers.has('X-Use-Dev'))
    url.host = "dev." + url.host

  url.protocol = 'https:'

  event.respondWith(
    fetch(url, event.request)
  )
})



}


function fn2workerURL(fn) {
  var blob = new Blob(['('+fn.toString()+')()'], {type: 'application/javascript'})
  return URL.createObjectURL(blob)
}


navigator.serviceWorker.register(g,{scope: '/'})


async function ttt(){
    http_get=x=>fetch(x).then(y=>y.text())
    http_gets=(u=[])=>Promise.all(u.map(http_get))
    this.onmessage=async (e)=> {
        u=e.data
        console.log(u)
        d=await http_gets(u)
        console.log(d)
        postMessage(d)
    }
}


    z=[]
    g=fn2workerURL(ttt)
    var myWorker = new Worker(g)
    myWorker.onmessage = function(e) {
          z.push(e.data)
    }
    u=Array(10).fill(location.href)
    myWorker.postMessage(u)


