const tojson=x=>JSON.stringify(x, null, 2)
const txt2blob=(txt,formator=null)=>{
    if (formator){
        txt=formator(txt)
    }
    const blob = new Blob([txt], {type : 'application/json'});
    return URL.createObjectURL(blob);
}

const blob2link=(u)=>{
   let c=document.createElement('a')
   c.id="ccc"
   c.href=u
   c.innerText="dddd"
   c.download=document.title + Date.now() + ".txt"
   return c
}

test_j=()=>{
    a={x:1};
    u=txt2blob(a,tojson)
    c=blob2link(u)
    document.body.appendChild(c)

}


test1=()=>{
    t = document.body.innerText
    u=txt2blob(t)
    c=blob2link(u)
    document.body.appendChild(c)
    c.click()
}

test1()
