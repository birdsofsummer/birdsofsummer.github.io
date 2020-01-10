---
title: callback hell to promise
date: 2019-07-19 09:06:12
tags:
- nodejs
- promise 
- async
- callback
categories:
- [ async ]
- task

---

### [f1,f2,f3,f4,f5,]   -> [r1,r2,r3,r4,r5,]
```javascript
const run_parallel =(fs=[])=>fs.map(x=>x())

//async tasks
const run_parallel_p =(fs=[])=>Promise.all(fs.map(x=>x()))

```

### f1->f2->f3->f4->f5   -> r


```javascript

const repeat=(x,n)=>Array(n).fill(x)
const run_sequential=(fs=[],result)=>fs.reduce((acc,f)=>f(acc),result)
const run_repeat=async (f,n=1,result)=>run_sequential(repeat(f,n),result)

//async tasks
const run_sequential_p1=async ([h,...t],result)=> h ?  run_sequential(t,await h(result)) : result 
const run_sequential_p2=async(fs,result)=>fs.reduce(async (acc,f)=>f(await acc),result)
const run_repeat_p=async (f,n=1,result)=>run_sequential_p2(repeat(f,n),result)

```

### f1->f2->f3->...fn     
    cond ? next() : return

```javascript
//f=(ctx,next)=>{...;next()}
//compose([f1,f2,...,fn])
const compose=([h,...t])=>ctx=>{
    if (!h) { return ; }
    h(ctx,()=>compose(t)(ctx))
}


//f=async(ctx,next)=>{await g(ctx),await next()}
//compose([f1,f2,...,fn])
const compose1=([h,...t])=>async ctx=>{
    if (!h) { return ; }
    await h(ctx,()=>compose1(t)(ctx))
}

const test_compose=()=>{
        f1=(ctx,next)=>{
           ctx.user_name="ccc"
           next()
        }
        f2=(ctx,next)=>{
           token= ctx.user_name=="ccc" ? 2  : 0
           ctx.token=token
           next()
        }
        f3=(ctx,next)=>{
           token=ctx.token
           ctx.auth= token==2 ? true : false
           if (ctx.auth){
               next()
           }
        }
        f4=(ctx,next)=>{
            get_age=(x)=>123
            ctx.age=get_age(ctx.user_name)
            next()
        }

        ctx={}
        f=compose([f1,f2,f3,f4])
        f(ctx)
        console.log(ctx)
}


const test_compose1=async()=>{
    add=async(x)=>x+10
    superagent=require('superagent')
    get=u=>superagent.get(u).then(x=>x.header)
    u='http://www.baidu.com'
    baidu=()=>get(u)

    f1=async(ctx,next)=>{
        ctx.a=await add(10)
        ctx.b1=await baidu()
        await next()
    }

    f2=async(ctx,next)=>{
        console.log('2222222222222222222222',ctx.b1)
        ctx.b=await add(ctx.a)
        ctx.b2=await baidu()
        await next()
    }
    f3=async(ctx,next)=>{
        console.log('3333333333333333333333',ctx.b2)
        ctx.c=await add(ctx.b)
        ctx.b3=await baidu()
        await next()
    }
    f4=async(ctx,next)=>{
        console.log('44444444444444444444',ctx.b3)
        ctx.d=await add(ctx.c)
        ctx.b4=await baidu()
        await next()
    }

    ctx={}
    f=compose1([f1,f2,f3,f4])
    await f(ctx)
    console.log(ctx)
    // { a: 20, b: 30, c: 40, d: 50 } 
}


```



### callback hell

```javascript
//https://api.jquery.com/jQuery.get/
const callback_hell=()=>{
  fn=(...a,cb) 
  $.get("1",
     x1=>$.get(x1,
         x2=>$.get(x2,
                x3=>$.get(x3,
                   (x4)=>$.get(x4,
                               x5=>$.get(x5,x6=>{
                                  //...
                               })
                               )
                        )
         )
     )
  )
}



```
### test

```javascript

const get=async(u)=>fetch(u).then(x=>x.text())
const gets=(u=[1,2,3,4,5])=>run_parallel(u.map(get))

const test_run_seq=async()=>{
    add=async (x)=>x+10
    r0=await run_sequential_p1([get,get,get,get],"1")
    r1=await run_sequential_p2([get,get,get,get],"1")
    r2=await run_repeat_p(get,5,"1")
    r3=await run_sequential_p1([add,add,add],10)
    console.log(r3)

}

const test_async=async()=>{
    let u0="1"
    let r1=await get(u0)
    let r2=await get(r1)
    let r3=await get(r2)
    let r4=await get(r3)
}


const test_then=()=>{
    get("1")
    .then(get)
    .then(get)
    .then(get)
    .then(get)
    .then(console.log)
}

const test_rxjs=()=>{
      get1()
      .map(get)
      .map(get)
      .map(get)
      .map(get)
      .mergeAll()
      .subscribe(console.log);
}

```
### callback -> async/await

```javascript

const each=(f)=>(o={})=> Object.entries(o).forEach(f)
const {promisify} = require('util');
//https://github.com/browserify/node-util

const promisify0=(fn,t)=>(...arg)=>new Promise((f1,f2)=>fn.call(t,...arg,(err,d)=>err?f2(err):f1(d)))   //fn(...,cb=(err,d)=>(...)) //redis..
const promisify1=(fn)=>(...arg)=>new Promise((f1,f2)=>fn(...arg,(err,d)=>err?f2(err):f1(d)))   //fn(...,cb=(err,d)=>(...))
const promisify2=(fn)=>(...arg)=>new Promise((f1,f2)=>fn(...arg,f1))   //fn(...,cb)
const promisify3=(fn)=>(...arg)=>new Promise((f1,f2)=>fn(f1,...arg,))  //fn(cb,...)
const promisifyAll=(c)=>{
    let f=([k,v])=>c.__proto__["_"+k]=promisify(v).bind(c)
    each(f)(c.__proto__)
    return c
}
const promisifyAll1=(c)=>{
    let f=([k,v])=>c.__proto__["_"+k]=promisify0(v).bind(c)
    each(f)(c.__proto__)
    return c
}

const promisifyAll2=(c)=>{
    let p=c.constructor;
    let o=p.prototype
    let f=([k,v])=>o["_"+k]=promisify0(v,c)
    each(f)(o)
    return c
}

```


```javascript

const test_promisify1=async()=>{
      //  callback
      add=(x,y,f)=>f(null,x+y)
      add(1,2,console.log)

      add1=promisify1(add)
      r=await add1(1,3)
      console.log(r)

}

const test_promisify_no_err=async()=>{
      add_ok=(x,y,f)=>f(x,y)
      add_ok1=promisify2(add_ok)
      r=await add_ok1(1,2)
      console.log(r)
}

const test_promisify2=async()=>{
      sleep0=(f,n)=>setTimeout(f,n*1000)
      sleep_p0=promisify2(sleep1)

      console.log(1)
      await sleep_p0(3)
      console.log(2)
}

const test_promisify3=async()=>{
      sleep0=(f,n)=>setTimeout(f,n*1000)
      sleep_p1=promisify3(sleep0)

      console.log(1)
      await sleep_p1(3)
      console.log(2)
}

const test_promisify_all=async ()=>{
    const redis = require("redis");
    const conn=()=>{
        let client = redis.createClient();
        promisifyAll(client)
        //promisifyAll1(client)
        //promisifyAll2(client)
        return client
    }
    c=conn()
    r1=await c._set('foo',"ddd")
    r2=await c._get('foo')
    console.log(r1,r2)
}
```



