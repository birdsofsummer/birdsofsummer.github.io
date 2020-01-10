const to_s=(x)=>x.toString().trim()
const join_path=(...a)=>a.map(to_s).join("");

class Router{
    init_path(){
        this.pre=""
        this.i={ }
    }
    prefix(x=""){
        this.pre=x
    }
    constructor(){
        this.init_path()
        let m=["get","post","delete","put"]
        m.forEach(x=>{
            this[x]=(name="",u="/",f=superagent[x])=> {
                let pre=this.pre
                let u1=pre ? join_path(pre,u) : u
                let name1=name||u;
                (this.i[name1]) || (this.i[name1] = {})
                this.i[name1][x]=(...a)=>f(u1,...a)
            }
        })
    }
}


export {
    Router
}
/*
const test_router=()=>{
    superagent=require("superagent")
    say=(x)=>(...y)=>console.log(x,...y)
    r=new Router()
    r.prefix("http://www.baidu.com")
    r.get("key","/key")
    r.post("reg","/register")
    r.post("msg","/msg")
    let z=r.i
    return z
}

const main=()=>{
    z=test_router();
    //z.msg.post('ccc').then(say('zzz')).catch(say('eee'))
    //z.msg.post({x:1,y:2}).then(say('zzz')).catch(say('eee'))
}

*/
