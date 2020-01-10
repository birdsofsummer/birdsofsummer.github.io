// ==UserScript==
// @name     保存txt
// @version  1
// @grant    none
// ==/UserScript==
// @match  https://*

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

const test_json=()=>{
    a={x:1};
    u=txt2blob(a,tojson)
    c=blob2link(u)
    document.body.appendChild(c)

}

const save=()=>{
    t = document.body.innerText
    u=txt2blob(t)
    c=blob2link(u)
    document.body.appendChild(c)
    c.click()
    console.log('ccccccccccc')
}

setTimeout(save,5000)


