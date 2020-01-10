
get_book_detail=x=>{
       id=x.dataset.id
       console.log(id)
       link = x.querySelector('a.title')
       if (!link) return
       href=link.href
       name=link.innerText
       desc=x.querySelector('p.desc').innerText
       author=x.querySelector('.u-author span').innerText
       rate=+x.querySelector('span.num').innerText.match(/\d+/)[0]
       cover=x.querySelector('.cover img').src
       return { id, name, href, desc, author, rate, cover, }
}

parse_html=y=>{
            b=document.createElement('div');
            //b=document.body
            b.innerHTML=y;
            return [...b.querySelectorAll('li[data-id]')]
                   .map(get_book_detail)
                   .sort((b,a)=>a.rate-b.rate)
}

const url_list=()=>[...document.querySelectorAll('li.level1 a')]
        .map(x=>([x.href,...x.innerText.split('\n')]))
        .map(([x,y,z])=>([x,y,+z]))
        .map(([url,name,qty])=>({url,name,qty,pages: Math.ceil(qty/14)}))
        .map(({url,name,qty,pages})=>Array(pages).fill(0).map((x,i)=>url.slice(0,-1)+(i+1)))

const run=async ()=>{
    z=[]
    g=fn2workerURL(get_all)
    var myWorker = new Worker(g)
    myWorker.onmessage = function(e) {
          z.push(e.data)
    }
    u=url_list()
    z0=await loop(x=>myWorker.postMessage(x),u,3000)
 //   save('z',z)
    z1=await loop(parse_html,z.flat(),r,1000)
    console.log("done")
}

run()
