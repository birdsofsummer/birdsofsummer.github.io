import {Router} from "/js/api/router.js"
const init_loading=()=>{
    let target= document.querySelector('.loading')
    var spinner = new Spinner().spin();
    target.appendChild(spinner.el);
    return (stop="")=> stop ? spinner.stop() : spinner.spin(target)
}
const loading=init_loading()

const log=console.log
const say=x=>y=>console.log(x,y)

const normaliz=(a=[],key="name")=>({o:a,k: a.map(x=>x[key]),kv:Object.fromEntries(a.map(x=>[x[key],x]))})


const sqrt1=(l)=>{
    const {sqrt,ceil}=Math
    let l1=sqrt(l)
    let n=ceil(l1)
    return n
}
const to_json=(s="")=>{
    try{
        return JSON.parse(s)
    }catch(e){
        return {}
    }
}
const get=async (u)=>{
    loading()
    let r=await fetch(u)
    let txt=await r.text()
    r.data=to_json(txt)
    r.txt=txt
    loading("stop")
    return r
}

const post=async(u,d)=>{
    loading()
    try{
        let r=await superagent.post(u,d)
        return r
    }catch(e){
      console.log(e)
    }
    loading("stop")
}
const send_msg=d=>post("/msg",d)
const init_color=async ()=>Promise.all(["/json/color.json","/json/color1.json",'/json/color2.json','/json/color3.json'].map(get))

const router=()=>{
    const r=new Router();
    let prefix="https://service-afbgj3k2-1252957949.ap-hongkong.apigateway.myqcloud.com/release/web-push/"
    r.prefix(prefix)
    r.get("key","key")
    r.post("reg","register")
    r.post("msg","msg")
    return r
}

const store=(k,v)=>{
    if (k && v){
        return localforage.setItem(k,v)
    }else if (k){
        return localforage.getItem(k)
    }else{
        localforage.iterate(console.log)
        return localforage.keys()
    }
}
export {
    post,
    send_msg,
    init_color,
    loading,
    router,
    store,
}

