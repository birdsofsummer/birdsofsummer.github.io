$=x=>document.querySelector(x)
toint=(k,v)=>/^age/.test(k) ? +v : v
extend=o1=>o2=>Object.entries(o2).map(([k,v])=>o1[k]=v)
copy= x => JSON.parse(JSON.stringify(x))
say=x=>y=>console.log(x,y)
post=u=>async (d)=>{
      const
          body=JSON.stringify(d),
          method="post",
          r =await fetch(u,{body,method}),
          {status,ok, statusText}=r
      if (ok) {
          alert(":)")
      }else{
          let tt=[":(",method,body,status + ' '+statusText].join('\n')
          alert(tt)
      }
}

const
    getproxy=(formater=(k,v)=>v)=>({
        set:(o,k,v,r)=>Reflect.set(o,k,formater(k,v),r),
        get:(o,k,r)=>Reflect.get(o,k,r),
/*            deleteProperty: function (oTarget, sKey) {
            if (sKey in oTarget) { return false; }
            return oTarget.removeItem(sKey);
        },
        enumerate: function (oTarget, sKey) {
            return oTarget.keys();
        },
        ownKeys: function (oTarget, sKey) {
            return oTarget.keys();
        },
        has: function (oTarget, sKey) {
            return sKey in oTarget || oTarget.hasItem(sKey);
        },
        defineProperty: function (oTarget, sKey, oDesc) {
            if (oDesc && 'value' in oDesc) { oTarget.setItem(sKey, oDesc.value); }
            return oTarget;
        },
        getOwnPropertyDescriptor: function (oTarget, sKey) {
            var vValue = oTarget.getItem(sKey);
            return vValue ? {
                value: vValue,
                writable: true,
                enumerable: true,
                configurable: false
            } : undefined;
        },
        */
    }),
    init_form=f=>d=>{
        for (i of f) {
            if (!i || /button|submit|fieldset/.test(i.type)) continue
            let { name, value ,type} =i;
            if (type === "radio"){
                value === d[name] ? i.checked = true : null
            }else{
                d[name] ? i.value = d[name] :null;
            }
        }
    };
   const ff=(f,data,handler,action,cb=null)=>{
            const p=new Proxy(data,handler)
            const log=()=>{
                say('data')(data)
                say('proxy')(copy(p))
            }
            init_form(f)(data)
            f.addEventListener('change',({target:{name,value}})=>{
                p[name]=value;
                log();
           })
            f.addEventListener('submit',e=>{
                let d=copy(p);
                log();
                action && action(d)
            })
    }

test=()=>{
    const form=$('form');
    const handler=getproxy(toint)
    const  data={
            root:"root",
            name:"123",
            cars:"saab",
            message:"The cat was playing in the garden.",
            password:"pwd",
            city:"zz",
            age:10,
            browser: "Netscape",
            browser1:"Chrome",
            points:10,
            "quantity" :3,
            "bday":"2000-01-02",
     }
     ff(form,data,handler,post("/login"))
}
test();

