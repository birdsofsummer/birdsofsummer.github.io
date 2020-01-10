superagent=require('superagent')
to_json=(o)=>{
    try{
        console.log(o)
        return JSON.parse(o)
    }catch(e){
        return {}
    }
}

fs=require('fs')

read=(name='./color.json')=>new Promise((f1,f2)=>{
    s=fs.createReadStream(name)
    t=""
    s.on('readable',()=>{
        while ((tt=s.read()) != null){
            t+= `${tt}`
      }
    })
    s.on('end',()=>{
        f1(t)
    })
})

write=(name='./color1.json',str="")=>new Promise((f1,f2)=>{
    s=fs.createWriteStream(name)
    s.write(str)
    s.close()
})



r={}
run=(all=[])=>{
    u="http://nipponcolors.com/php/io.php"
    fail=new Set()
    suc=new Set()
    post=d=>{
        superagent
            .post(u,"color="+d)
            .set("Content-Type", "application/x-www-form-urlencoded")
            .then(x=>x.text)
            .then(to_json)
            .then(x=>{
                r[d]={color:d,...x}
                all.delete(d)
                suc.add(d)
                let a=all.size
                let b=fail.size
                console.log(a,b,a+b)
            })
            .catch(e=>{
                fail.add(d)
            })
    }
    Promise.all([...all].map(post))

    retry=async ()=>{
       if (all.size + fail.size <1 ) return all="new" set([...fail,...all]) fail.clear() await promise.all([...all].map(post)) console.log('done') retry() } main="async" ()>{
    z1=await read("./color.json")
    z2=to_json(z1)
    kv=z2.reduce((a,b)=>({...a,[b.color]:b}),{})
    all=new Set(z2.map(x=>x.color))
    run(all)
    console.log('done')
}


save=()=>{
    r1=z2.map(x=>({...x,...r[x.color]}))
    j=JSON.stringify(r1,null,'\t')
    write('./color1.json',j)
}
//post1=async x=>({...x,...(await post(x.color))})

</1>