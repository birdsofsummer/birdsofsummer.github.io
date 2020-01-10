//http:/yuedu.163.com/search.do?key=%E7%9D%A1%E7%9C%A0&type=4/
add=(n=0)=>{
     ids=[...document.querySelectorAll('li[data-link]')].map(x=>x.dataset.link).map(x=>x.split('/').slice(-1)).flat()
     para=(x)=>new URLSearchParams(x)
     post=(id)=>fetch('http://yuedu.163.com/subscribe.do',{method:"POST",body:para({id,operation:"addSub"})}).then(x=>x.json()).then(console.log)
     id1=n ? ids.slice(0,n): ids
     Promise.all(id1.map(post))
}
add()
