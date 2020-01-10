import {now,to_s,to_json} from "/js/fp/q.js"
import {router,store} from "/js/api/api.js"
import {
    loading,
    router,
    store,
} from "/js/api/api.js"

const work=(name="/js/worker/echo.js", {onmessage,onerror}={onmessage:console.log,onerror:console.log},)=>{
        const myWorker = new Worker(name);
        myWorker.onmessage = onmessage
        myWorker.onerror = onerror
        myWorker.send=msg=>myWorker.postMessage(msg);
        return myWorker
}
const bwork=(s=`onmessage = function(e) { console.log("->",e.data);postMessage(e.data); }`)=>{
    var blob = new Blob([s]);
    var blobURL = window.URL.createObjectURL(blob);
    var worker = new Worker(blobURL);
    worker.onmessage =console.log
    worker.send=(x)=>worker.postMessage(x)
    return worker
}
const swork=(name="/js/worker/echo1.js", cb=console.log,)=>{
    var myWorker = new SharedWorker(name);
    myWorker.port.start();
    myWorker.port.onmessage = cb
    myWorker.send=x=>myWorker.port.postMessage(x)
    return myWorker
}

const test_work=(msg)=>{
    workers=[work,swork,bwork]
    workers.forEach(x=>{
        w=x()
        w.send(msg);
    })
}

function sendMessage(message) {
  return new Promise(function(resolve, reject) {
        var messageChannel = new MessageChannel();
        messageChannel.port1.onmessage = function(event) {
          if (event.data.error) {
            reject(event.data.error);
          } else {
            resolve(event.data);
          }
        };
        navigator.serviceWorker.controller.postMessage(message,
          [messageChannel.port2]);
      })
}

const receiveMessage=(event)=> {
    const src=event.origin
    const d=event.data
    event.source.postMessage("->",src);
    event.source.postMessage(d,src);
    console.log(event)
}

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
  }

const reg_sw=async (file,scope={ scope: '/' })=>{
    //window.addEventListener("message", receiveMessage, false);
    navigator.serviceWorker.addEventListener('message', event => {
              console.log(event.data);
    });
    const s=await navigator.serviceWorker.register(file,scope)
    const t=await navigator.serviceWorker.ready
  //  const k=await get("/key")
    const k={"publicKey":"BFm1Mr-2QGxbK9CTm1Bwuyeh8QIEYma3USSafS0uwH-eVHphyMOcc2sImDXlVLCp359IcVw3r4vpR0TMMTTh5j8","privateKey":"HxgW5R9vta5BFt_UtjqGiWIPfdgHvrM-qITRapsDlXQ"}
    let o={
        userVisibleOnly: false,
        // tag : 'user_alerts',
        //"token":"11-instance-id-11",
        "applicationServerKey":urlBase64ToUint8Array(k.publicKey),
    }
    try{
        const pub= await s.pushManager.subscribe(o)
        console.log(JSON.stringify(pub))

        //const r=register(pub)
        return pub
    }catch(e){
        console.log(e)
    }

    //const note=await t.getNotifications(o)
    //const sub=await t.pushManager.getSubscription()
    //console.log(note,sub)
    //sub.unsubscribe()
}

const reg_sw1=async ()=>{
    let s=await navigator.serviceWorker.register('/sw.js')
    let r=await navigator.serviceWorker.ready
    let n=await r.getNotifications({})
    let sub=await r.pushManager.getSubscription
    console.log('sw',s,r,n,sub)
    let ss=await r.pushManager.subscribe({
      userVisibleOnly: true,
      //applicationServerKey: urlBase64ToUint8Array(vapidPublicKey)
    });
    console.log("ss",ss)
    //{ subscription, payload, delay, ttl, }
}
//----------------------------------------chan---------------------------
const test_chan=()=>{
    var channel = new MessageChannel();
    //iframe   channel.port1.onmessage=say('->chan1')
    //iframe.contentWindow.postMessage('1111', '*', [channel.port2]);
    // window.addEventListener('message', (e)=>e.ports[0].postMessage(e.data););
}
//---------------------------------------postmsg--------------------------
function listen(){
    window.parent.postMessage('ddd');
    window.onmessage=console.log
}

function echo(event) {
  let d=event.data
  say('->')(d)
  event.source.postMessage(d, event.origin);
}


//---------------------------------------push--------------------------

const ask_perm=()=>Notification.requestPermission(say('perm'))

const notify=(title="", options={})=>{
    let t=to_s(title);
    let o={
        icon:"https://image.flaticon.com/icons/png/512/346/346195.png",
        body:"",
        ...options,
    }
    let show=()=>new Notification(t, o)
    Notification.permission === "granted" ? show() : Notification.requestPermission(show)
}
const notify_m=({data})=>notify(now(),{body:to_s(data)})
const notify1=(title="ccc",body="ddd")=>{
     let a=new Notification(title, {body, icon: "/img/1.jpg", });
 }


function showNotification() {
  Notification.requestPermission(function(result) {
    if (result === 'granted') {
      navigator.serviceWorker.ready.then(function(registration) {
        registration.showNotification('Vibration Sample', {
          body: 'Buzz! Buzz!',
          icon: '/images/1.png',
          vibrate: [200, 100, 200, 100, 200, 100, 200],
          tag: 'vibration-sample'
        });
      });
    }
  });
}

function showNotification1(){
    Push.create("ccc", {
        body: "ddd",
        icon: '/images/1.png',
        timeout: 4000,
        onClick: function () {
            window.focus();
            this.close();
        }
    });
}

//1.get('/key')
//2.post('register',d)
//3.post('/send',d)

const get_vapidPublicKey=()=>{
    let k=`BLSXpcaBTf_fzxyQZ_slIXZG07EOF4GS2RvGVD96-k2Aa-FZSzgDGPMFbSvtYojiwPCf2gC6RCJuiYsHPWnUX6Q`
    return k
}
const register_sub=()=>{
        let d={
        "subscription": {
            "endpoint": "https://updates.push.services.mozilla.com/wpush/v2/gAAAAABdK-5kYVaT6INtaSqpdjx2qQj-MkuPkVIT-8qnJvDq2s4pN0tarzTalkA7SsVSdAtQGPjRZaRGNukTpDIShv0gZtnxbqbo0ClfWmhUq92DbdCUEpcd-nMV0_8ODR7Mjw-7-ytqUhv4aLEANSPdonVIun5Xv-rPyo4sBQzht2yjfTLfomA",
            "keys": {
                "auth": "HvUq-iJgA_Q98Jz-pfQ4iQ",
                "p256dh": "BKxue3VNxO4yJewFd1OJyxttEJuSs2-EjYA_8684lg9ig-bgcn3VKsnykUjOShj8PAtpBIsyNVaqyooH6cBCgrw"
            }
        }
    }
}
const send_push=()=>{
       let d={
        "subscription": {
            "endpoint": "https://updates.push.services.mozilla.com/wpush/v2/gAAAAABdK-5kYVaT6INtaSqpdjx2qQj-MkuPkVIT-8qnJvDq2s4pN0tarzTalkA7SsVSdAtQGPjRZaRGNukTpDIShv0gZtnxbqbo0ClfWmhUq92DbdCUEpcd-nMV0_8ODR7Mjw-7-ytqUhv4aLEANSPdonVIun5Xv-rPyo4sBQzht2yjfTLfomA",
            "keys": {
                "auth": "HvUq-iJgA_Q98Jz-pfQ4iQ",
                "p256dh": "BKxue3VNxO4yJewFd1OJyxttEJuSs2-EjYA_8684lg9ig-bgcn3VKsnykUjOShj8PAtpBIsyNVaqyooH6cBCgrw"
            }
        },
        "payload": "ccc",
        "delay": "5",
        "ttl": "1"
        }
}


//---------------------------------------listen------------------------

export {
    echo,
    listen,
    sendMessage,
    showNotification,
    showNotification1,
    urlBase64ToUint8Array,
    ask_perm,
    get_vapidPublicKey,
    notify,
    notify1,
    notify_m,
    receiveMessage,
    register_sub,
    reg_sw,
    reg_sw1,
    send_push,
    bwork,
    swork,
    test_chan,
    test_work,
    work,
}


