const curl_heads=(a="")=>Object.fromEntries(a.split('\n').slice(1).map(x=>x.split(': ')))
const gbk=(x)=>new Promise((resolve,reject)=>{
      let c=new FileReader();
      c.onloadend=e=>{ resolve(c.result) }
      c.readAsText(x,"GBK")
})


//boss
const get=u=>fetch(u).then(x=>x.text())
const gets=us=>Promise.all(us.map(get))

//lagou
const post=d=>fetch(u,{method:"POST",body:new URLSearchParams(d)}).then(x=>x.json())
const posts=us=>Promise.all(us.map(post))

const posts1=async (us)=>{
    r=[]
    for await (const i of lazy(post,us)){
        r.push(i)
        await sleep()
    }
    return r
}

//51job
const get_gbk=async (x)=>{
      let a=await fetch(x)
      let b=await a.blob()
      let c=await gbk(b)
      return c
}
const gets_gbk=(u=[])=>Promise.all(u.map(get))
export {
    curl_heads,
    gbk,
    get,
    gets,
    get_gbk,
    gets_gbk,
    post,
    posts,
    posts1,
}

